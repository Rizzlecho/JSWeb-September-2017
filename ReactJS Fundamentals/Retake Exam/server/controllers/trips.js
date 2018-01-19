const collectionName = 'trips';

module.exports = {
    get: async (req, res) => {
        try {
            if (Object.keys(req.query).length > 0) {
                return res.json(await req.storage.query(collectionName, req.query));
            }
            res.json(await req.storage.get(collectionName));
        } catch (err) {
            console.log(err);

            if (err instanceof ReferenceError) {
                res.status(404);
                res.json({ error: 'Collection not found: ' + req.params.id });
                return;
            }
            res.status(400);
            res.json({ error: err });
        }
    },
    search: async (req, res) => {
        if (Object.keys(req.query).length == 0) {
            errorResponse(res, 400, 'Missing query parameters.');
            return;
        }
        // Validate params
        if (!req.query.origin || req.query.origin.length == 0) {
            errorResponse(res, 400, 'Missing query parameter: origin');
            return;
        }
        if (!req.query.destination || req.query.origin.destination == 0) {
            errorResponse(res, 400, 'Missing query parameter: destination');
            return;
        }
		if (!req.query.date || req.query.origin.date == 0) {
            errorResponse(res, 400, 'Missing query parameter: date');
            return;
        }
		return res.json(await req.storage.query(collectionName, {
			origin: req.query.origin,
			destination: req.query.destination
		}));
    },
    getById: async (req, res) => {
        try {
            const result = await req.storage.get(collectionName, req.params.id);
            res.json(result);
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
    }
};

function errorResponse(res, code, msg) {
    res.status(code);
    res.json({ error: msg });
}