import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    getProfile,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    updateAccountDetails
} from "../controllers/user.controller.js";

import {
    getWatchHistory,
    addToWatchHistory,
    removeFromWatchHistory
} from "../controllers/history.controller.js";

import multerMiddleware from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Register route with multer middleware for file uploads
router.route("/register").post(
    multerMiddleware.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);

router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/profile").get(verifyJWT, getProfile);
router.route("/update-account").put(verifyJWT, updateAccountDetails);

// Update avatar and cover image routes with multer middleware
router.route("/avatar").put(verifyJWT, multerMiddleware.single("avatar"), updateUserAvatar);
router.route("/cover-image").put(verifyJWT, multerMiddleware.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(verifyJWT, getUserChannelProfile);

router.route("/history")
    .get(verifyJWT, getWatchHistory)
    .post(verifyJWT, addToWatchHistory); // Route to add a video to watch history

router.route('/history/:videoId').delete(verifyJWT, removeFromWatchHistory); // Route to remove video from watch history

export default router;
