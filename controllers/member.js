const Member = require('../models').Member;
const Pattern = require('../models').Pattern;
const Avatar = require('../models').Avatar;

const showMember = (req, res) => {
    Member.findByPk(req.params.index, {
        include: [{
            model: Pattern,
        },
        {
            model: Avatar,
        }]
    }).then(member => {
        Pattern.findAll().then(pattern => {
            res.render('member/profile.ejs', {member, pattern})
        })
    })
};

const renderEdit = (req, res) => {
    Member.findByPk(req.params.index, {
        include: [{
            model: Pattern,
            attributes: ['memberId','title', 'introContent'] 
        },
        {
            model: Avatar,
            attributes: ['id','imgName', 'imgUrl'] 
        }]
    }).then(member => {
        Pattern.findAll().then(allPattern => {
            Avatar.findAll().then(allAvatar => {
                res.render('member/edit.ejs', {member, allPattern, allAvatar})
            })
        })
    })
};


const deleteMember = (req, res) => {
    Member.destroy({where: { id: req.params.index }}).then(() => {
        res.redirect('/');
    });
};

const editMember = (req, res) => {
    Member.update(req.body, { where: {
        id: req.params.index },
        returning: true, 
        plain: true
    }).then(updatedMember => {
        res.redirect(`/member/profile/${updatedMember[1].dataValues.id}`)
    })
};

module.exports = {
    showMember,
    renderEdit,
    editMember,
    deleteMember
}