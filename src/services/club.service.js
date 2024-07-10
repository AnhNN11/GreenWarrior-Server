import ClubModel from '../models/club.model.js';

const clubService = {
    createClub: async (req) => {
        const clubRequest = new ClubModel(req);
        const club = await ClubModel.create(clubRequest);
        return club;
    },

    getAll: async () => {
        const clubs = await ClubModel.find({});
        return clubs;
    },

    get: async (id) => {
        const club = await ClubModel.findById(id).populate('category');
        return club;
    },

    getBySubname: async (subname) => {
        const club = await ClubModel.findOne({ subname: subname }).populate(
            'category'
        );
        return club;
    },

    getWithPagination: async (
        filters = {},
        search = '',
        page = 1,
        limit = 10
    ) => {
        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        if (search?.length) {
            const searchRegex = new RegExp(search, 'i');
            filters.$or = [{ name: searchRegex }, { subname: searchRegex }];
        }

        // Apply filters and pagination to the query
        const clubs = await ClubModel.find(filters)
            .populate('category')
            .skip(skip)
            .limit(limit);

        // Get the total count of documents that match the filters
        const totalCount = await ClubModel.countDocuments(filters);

        return {
            length: clubs.length,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            clubs,
        };
    },

    update: async (req) => {
        const clubRequest = new ClubModel(req);
        const club = await ClubModel.findByIdAndUpdate(
            clubRequest._id,
            {
                $set: clubRequest,
            },
            { new: true }
        );
        return club;
    },

    delete: async (id) => {
        const club = await ClubModel.deleteById(id);
        return club;
    },
};

export default clubService;
