"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products_tb", "stock", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      after: "price",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("products_tb", "stock");
  },
};
