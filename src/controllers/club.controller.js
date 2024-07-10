import './../models/clubCategory.model.js';
import Club from './../models/club.model.js';
import APIFeatures from './../utils/APIFeatures.js';
import AppResponse from './../utils/AppResponse.js';
import AppError from '../utils/AppError.js';
import catchAsync from './../utils/catchAsync.js';
import clubService from '../services/club.service.js';
import eventServices from '../services/event.service.js';
const handleRouteNotYetDefined = (res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route not yet defined!',
    });
};
const ClubController = {
    aliasTopClub: (req, res, next) => {
        req.query.limit = 5;
        req.query.sort = '-activityPoint,balance';
        req.query.fields = 'name,subname,description,activityPoint,balance';
        next();
    },
    getAllClubs: catchAsync(async (req, res, next) => {
        const features = new APIFeatures(Club.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const clubs = await features.query.populate('category', 'name');
        AppResponse.success(res, clubs.length, { clubs });
    }),
    getClubStats: catchAsync(async (req, res, next) => {}),
    addClub: catchAsync(async (req, res, next) => {
        const newClub = await Club.create(req.body);
        AppResponse.success(res, { newClub });
    }),
    getClub: catchAsync(async (req, res, next) => {
        const club = await Club.findOne({ _id: req.params.id });
        if (!club) {
            return next(
                new AppError(`No club found with that ID ${req.params.id}`, 404)
            );
        }
        AppResponse.success(res, club.length, { club });
    }),
    updateClub: catchAsync(async (req, res, next) => {
        const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!club) {
            return next(
                new AppError(`No club found with that ID ${req.params.id}`, 404)
            );
        }
        AppResponse.success(res, club.length, { club });
    }),
    deleteClub: catchAsync(async (req, res, next) => {
        handleRouteNotYetDefined(res);
    }),
    getWithPagination: async (req, res, next) => {
        // #swagger.tags = ['Clubs']
        try {
            const { page = 1, limit = 10, filters, search } = req.query;
            const pageNum = parseInt(page, 10);
            const pageSizeNum = parseInt(limit, 10);

            // Parsing filters safely
            let parsedFilters = {};
            if (filters) {
                try {
                    parsedFilters = JSON.parse(filters);
                } catch (error) {
                    return res
                        .status(400)
                        .json({ error: 'Invalid filters format' });
                }
            }

            const clubs = await clubService.getWithPagination(
                parsedFilters,
                search,
                pageNum,
                pageSizeNum
            );

            // #swagger.responses[200]
            res.status(200).json({
                result: clubs,
            });
        } catch (error) {
            next(error);
        }
    },
    getClubDetailAndEventBySubname: async (req, res, next) => {
        // #swagger.tags = ['Clubs']
        try {
            const { subname } = req.query;
            const club = await clubService.getBySubname(subname);
            const eventByClub = await eventServices.getByClubId(club._id);
            // #swagger.responses[200]
            if (club) {
                res.status(200).json({
                    clubInfo: club,
                    eventByClub: eventByClub,
                });
            } else {
                res.status(404).json({ message: 'Club not found' });
            }
        } catch (error) {
            next(error);
        }
    },
};

export default ClubController;
