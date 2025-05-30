'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("emails", [
      {
        type: "Welcome",
        subject: "Welcome to Our Platform!",
        html: "<h1>Hi there!</h1><p>Thanks for joining us.</p>",

      },
      {
        type: "Reminder",
        subject: "Don't forget your appointment",
        html: "<p>Your appointment is scheduled for tomorrow at 10 AM.</p>",
       
      },
      {
        type: "Promotion",
        subject: "Exclusive Offer Just for You!",
        html: "<p>Enjoy 20% off on your next purchase.</p>",
       
      },
      {
        type: "Password Reset",
        subject: "Password Reset request",
        html: `<p>For resetting your password... Click <a href="http://localhost:3000/staff/passwordreset">here</a></p>`,
      
      },
      {
        type: "Password Reset Success",
        subject: "Password Reset Successful",
        html: `<h3 style="text-align:center;">Password Reset Success</h3><br><h2 style="text-align:center;">Thank You.....</h2>`,
     
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("emails", null, {});
  }
};
