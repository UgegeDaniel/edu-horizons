//TODO: Add conditional base route

export const getVerificationEmailHtml = (verificationToken: string): string => {
  const verificationLink = `http://localhost:5000/user/verify-email/${verificationToken}`;

  return `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
           <div style="max-width: 600px; margin: 100px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
           <img src="" alt="EDU-HORIZONS LOGO"/>
             <h2 style="text-align: center; color: #333333;">Verify Your Account</h2>
             <p style="color: #555555; margin-bottom: 20px;">Please click the button below to verify your account to access more features ofthe Edu-horizons Platform</p>
             <a href="${verificationLink}" style="display: block; width: 200px; margin: 0 auto; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-align: center; text-decoration: none; border-radius: 4px;">Verify Account</a>
             <span> in paste this link in your browser ${verificationLink}</span>
           </div>
         </body>
        `;
};

export const getPasswordChangeRequestHtml = (verificationToken: string): string => {
  const verificationLink = `http://localhost:5000/user/forgot-password/${verificationToken}`;

  return `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
           <div style="max-width: 600px; margin: 100px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
           <img src="" alt="EDU-HORIZONS LOGO"/>
             <h2 style="text-align: center; color: #333333;">Password Request Change</h2>
             <p style="color: #555555; margin-bottom: 20px;">Please click the button below to change your password</p>
             <a href="${verificationLink}" style="display: block; width: 200px; margin: 0 auto; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-align: center; text-decoration: none; border-radius: 4px;">Change Password</a>
             <span> in paste this link in your browser ${verificationLink}</span>
           </div>
           <i>If you didn't make this reuest please contact Edu-Horizons Support<i/>
         </body>
        `;
};
