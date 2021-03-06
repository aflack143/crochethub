'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Patterns', [
      {
        title: 'Admin Project',
        patternType: 'crochet',
        introImg: 8,
        introContent: 'Admin setting up initial project',
        itemsNeeded: 'Hook: size G',
        contentHowTo: 'To begin-chain 25',
        patternImg: 'https://s3-us-west-2.amazonaws.com/cag.kp.images/LandingPages/VirtualMeetingBackgrounds/KP-Zoom_4.jpg',
	      endingContent: 'thank you',
        memberId: 1,
        commentId: null
    }, 
    {
        title: 'Test Project',
        patternType: 'crochet',
        introImg: 10,
        introContent: 'Tester creating 1st project',
        itemsNeeded: 'Hook: size G',
        contentHowTo: 'Row 1-create circle with 5 sc',
        patternImg: 'https://p0.pikist.com/photos/275/7/wool-hook-craft-yarn-thread-hobby-crochet-hook-cotton-fashion.jpg',
	      endingContent: 'thank you',
        memberId: 1,
        commentId: null
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
  }
};
