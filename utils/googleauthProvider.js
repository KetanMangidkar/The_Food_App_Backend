import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/userModel.js";

//Function for working on passport
export const connectPasport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, cbdone) {
        //for finding user is available in db or not
        const user = await User.findOne({
          googleId: profile.id,
        });

        //If not then create by following the method
        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
          });
          return cbdone(null, newUser);

          //else return the existing one
        } else {
          return cbdone(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, cbdone) => {
    cbdone(null, user.id);
  });
  passport.deserializeUser(async (id, cbdone) => {
    const user = await User.findById(id); //find user in Db(if user find)

    cbdone(null, user);
  });
};
