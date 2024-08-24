import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
    getVideosofuser,
    getyourvideos
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get('/', getAllVideos);

router
    .route("/:userId")
    .post(
        upload.fields([
            { name: "videoFile", maxCount: 1 },
            { name: "thumbnail", maxCount: 1 },
        ]),
        verifyJWT,
        publishAVideo
    );

router
    .route("/:videoId")
    .get(getVideoById)
    .delete(verifyJWT, deleteVideo)
    .patch(
        upload.single("thumbnail"),
        verifyJWT,
        updateVideo
    );

router.route("/profile/:userId").get(verifyJWT, getVideosofuser);

router.route("/toggle/publish/:videoId").patch(verifyJWT, togglePublishStatus);

export default router;
