const collectionName = "cart";

module.exports = {
    get: async (req, res) => {
        const user = req.user.email;
        try {
            const tickets = await req.storage.query(collectionName, { user });
            // Get trip details for each ticket
            const trips = await req.storage.get('trips');
            const result = [];
            for (let ticket of tickets) {
                const trip = trips.filter(t => t._id == ticket.tripId)[0];
                result.push({
                    tripId: ticket.tripId,
                    origin: trip.origin,
                    destination: trip.destination,
                    date: ticket.date,
                    time: trip.time,
                    arrives: trip.arrives,
                    duration: trip.duration,
                    class: ticket.class,
                    price: trip.tickets[ticket.class],
                    count: ticket.count,
                    _id: ticket._id
                });
            }
            res.json(result);
        } catch (err) {
            console.log(err);

            if (err instanceof ReferenceError) {
                return res.json([]);
            }
            res.status(400);
            res.json({ error: err });
        }
    },
    post: async (req, res) => {
        const user = req.user.email;
        const ticket = req.body;
        ticket.user = user;
        const result = await req.storage.add(collectionName, req.body);

        delete result.user;
        const response = {
            success: true,
            message: "Tickets added to cart",
            ticket: result
        };

        res.json(response);
    },
    deleteById: async (req, res) => {
        const user = req.user.email;
        try {
            const ticket = await req.storage.get(collectionName, req.params.id);
            if (ticket.user != user) {
                res.status(401);
                res.json({ error: 'Access denied for entry: ' + req.params.id });
                return;
            }
            await req.storage.delete(collectionName, req.params.id);
            res.json({
                success: true,
                message: "Tickets removed from cart",
            });
        } catch (err) {
            console.log(err);

            if (err instanceof ReferenceError) {
                res.status(404);
                res.json({ error: 'ID not found: ' + req.params.id });
                return;
            }
            res.status(400);
            res.json({ error: err });
        }
    },
    checkout: async (req, res) => {
        const user = req.user.email;
        // get tickets from cart
        try {
            const tickets = await req.storage.query(collectionName, { user });
            if (tickets.lenght == 0) throw new ReferenceError();
            // Get trip details for each ticket
            const trips = await req.storage.get('trips');
            for (let ticket of tickets) {
                const trip = trips.filter(t => t._id == ticket.tripId)[0];
                req.storage.add('history', {
                    user,
                    tripId: ticket.tripId,
                    origin: trip.origin,
                    destination: trip.destination,
                    date: ticket.date,
                    time: trip.time,
                    arrives: trip.arrives,
                    duration: trip.duration,
                    class: ticket.class,
                    price: trip.tickets[ticket.class],
                    count: ticket.count,
                    _id: ticket._id
                });
            }
            res.json({
                success: true,
                message: "Ticket purchase confirmed"
            });
        } catch (err) {
            console.log(err);

            if (err instanceof ReferenceError) {
                res.status(400);
                res.json({
                    success: false,
                    message: 'No tickets in cart.'
                });
                return;
            }
            res.status(400);
            res.json({ error: err });
        }
    },
    history: async (req, res) => {
        const user = req.user.email;
        try {
            res.json(await req.storage.query('history', { user }));
        } catch (err) {
            console.log(err);

            if (err instanceof ReferenceError) {
                return res.json([]);
            }
            res.status(400);
            res.json({ error: err });
        }
    }
};