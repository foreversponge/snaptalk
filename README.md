# SnapTalk

## Description

SnapTalk is a social media application for Android. It allows users to stay updated on the content posted by other users. The user can post, comment, and like pictures. By following another account, the user can receive notifications of new pictures posted by the followed account. The user can also send messages to other users and can customize the UI of the application.

## Objective

The objective of this project is to develop a social media application that ressembles Instagram.

## Core Features

1. The user can post pictures.
2. The user can follow other users and received notifications when the followed user posts a picture.
3. The user can leave comments to posted pictures.
4. The user can like other users' posts.
5. The user can change his profile header color.

## Team Members


Name | Github ID
------------ | -------------
**Manraj Rai (tech lead)** | [Manraj45](https://github.com/Manraj45)
Samuel Huang | [huangs08](https://github.com/huangs08)
Lauren Lim | [Mxn458](https://github.com/Mxn458)
Razvan Ivan | [Talos10](https://github.com/Talos10)
Cosmin Sustac | [N0ot-No0t](https://github.com/N0ot-No0t)

## Technologies
* Android
* Firebase
* React Native
* JavaScript
* Node.js
* Android Studio
* 

## Screenshots

# 1. Loading Screen

> The client will see this page when SnapTalk is started.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/LoadingScreen-3.png" width="50%" height="50%">


# 2. Login

> The client can login to an existing account, or can create a new account.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/LoginScreen-1.png" width="50%" height="50%">

# 3. Registration

> The client can create an account. This account will be added to the database with the appropriate information.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/RegisterScreen-2.png" width="50%" height="50%">

# 4. Home Screen

> The home screen displays all posts from the users that are being followed by the client. It is empty because the client is not following any users at the time this screenshot is taken.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/HomeScreen-Empty-4.png" width="50%" height="50%">

> Example of a situation where the client is following a user.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/HomeScreen-Follow-8.png" width="50%" height="50%">

# 5. Discovery Screen

> The discovery screen displays all posts from all users.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/DiscoveryScreen-5.png" width="50%" height="50%">


# 6. Profile Screen / Follow Feature

> The client access another user's profile by clicking on the post's user name.
> The profile screen displays only the user's posts, as well as the user's number of posts, followers and following.
> The profile screen also displays the option to follow the user.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/ProfileScreen-Unfollow-6.png" width="50%" height="50%">

> The client can follow the user by pressing the follow button. This will update the database accordingly, as seen below.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/ProfileScreen-Follow-7.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/User-Following-Firebase.png" width="50%" height="50%">

> The home screen will then update and display all the posts from the user that the client is following, as seen below.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/HomeScreen-Follow-8.png" width="50%" height="50%">

# 7. Like Feature

> The client can like posts. For instance, on the discovery page, the client can like and unlike the new post. 

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/DiscoveryScreen-Like-9.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/DiscoveryScreen-Unlike-10.png" width="50%" height="50%">

# 8. Comment Feature

> The client can access any posts' comments section.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/CommentScreen-Empty-11.png" width="50%" height="50%">

> The client can comment on the post, as seen below. The database will also be updated accordingly, as well as the number of comments displayed on the post.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/CommentScreen-12.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/Comment-firebase.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/DiscoveryScreen-NumberOfComments-13.png" width="50%" height="50%">

> The client can edit the comment. The post information will be updated accordingly, as seen below.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/CommentScreen-Edit-14.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/Comment-edit-firebase.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/CommentScreen-AfterEdit-15.png" width="50%" height="50%">

> The client can delete the comment.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/CommentScreen-Delete-16.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/CommentScreen-Deleted-17.png" width="50%" height="50%">


# 9. Post Screen

> The client can post a picture with a caption. The post will be displayed on the Discovery screen.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/PostScreen-19.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/PostScreen-WithPic-20.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/DiscoveryScreen-Posted-21.png" width="50%" height="50%">

> The client's post will also be displayed on his profile picture. 

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/ProfilePageScreen-22.png" width="50%" height="50%">


# 10. SnapTalk Color Feature

> The client can choose SnapTalk's color schemes.

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/ColorOption-23.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/PickedColor-24.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/ProfilePageScreen-PickedColor-25.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/DiscoveryScreen-PickedColor-26.png" width="50%" height="50%">

<img src="https://github.com/huangs08/snaptalk/blob/master/screenshots/HomeScreen-PickedColor-27.pngg" width="50%" height="50%">