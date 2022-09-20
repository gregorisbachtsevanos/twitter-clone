const unfollowSystem = async (req, res) => {
    const currentUser = await getUser(res.locals.currentUser.username);
    const user = await getUser(req.params.username);
    currentUser.following = await currentUser.following.filter(
        (id) => id != user.id
    );
    user.followers = await user.followers.filter((id) => id != currentUser.id);
    currentUser.save();
    user.save();
    res.redirect(`/${user.username}`);
};

const search = async (req, res) => {
    let { search } = req.body;
    const users = await User.find({
        username: { $regex: "^" + search, $options: "i" },
    });
    res.send({ users });
};

const loadChatList = async (req, res) => {
    let chatList = await Chat.find({ users: { $elemMatch: { $eq: res.locals.currentUser._id } } }).populate('users').sort({ updatedAt: -1 })
    chatList = chatList.filter(user => user.id != res.locals.currentUser._id)
    res.send(chatList)
}

const createChatLogic = async (req, res) => {
    const users = JSON.parse(req.body.users);
    // return console.log(users)
    users.push(res.locals.currentUser.username);
    var groupUserId = []
    for (let user of users) {
        let u = await User.findOne({ username: user })
        groupUserId.push(u.id)
    }
    const chatData = {
        users: groupUserId,
        isGroup: true
    }

    const chat = new Chat(chatData);
    await chat.save();
    console.log(chat);
    res.status(200).send(chat)
}

const sendMesage = async (req, res) => {
    const { message, chatId } = req.body
    const senderId = res.locals.currentUser._id
    const msg = new Message({ message, chatId, senderId })
    await msg.save()
    res.redirect(`/chat/${req.params.chatId}`)
}