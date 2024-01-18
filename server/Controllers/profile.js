import Users from "../Models/userSchema.js";

async function getUser(req, res) {
    try {
        const id = req.params.id;

        const user = await Users.find({_id:id});

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data:user,
            message: "User Found Successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Can't find user"
        });
    }
}

export { getUser };
