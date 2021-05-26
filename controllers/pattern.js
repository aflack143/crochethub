const Member = require('../models').Member;
const Pattern = require('../models').Pattern;
const Comment = require('../models').Comment;
const Avatar = require('../models').Avatar;
const Design = require('../models').Design;

const index = (req, res) => {
    Pattern.findAll().then(pattern => {
        Member.findAll().then(member => {
            res.render('index.ejs', {
                pattern,
                member
            })
        });
    });
};

const renderNew = (req, res) => {
    Member.findAll().then(member => {
        res.render('create.ejs', {
            member
        })
    })
};

const postNew = (req, res) => {
    console.log(req.body)
        Pattern.create(req.body, {
            include: [{
                model: Member,
                attributes: ['id','username'] 
            }]
        }).then(newPattern => {
            Member.findAll().then(member => {
                res.redirect(`/pattern/${newPattern.patternType}/${newPattern.id}`)
        });
    });
};

const showPattern = (req, res) => {
    Pattern.findByPk(req.params.index, {
        include: [{
            model: Member,
            attributes: ['id','first_name','aboutMe','profileImg'],
            include: [{
                model: Avatar,
                attributes: ['id','imgName','imgUrl'] 
            }] 
        },
        {
            model: Design,
            attributes: ['id','imgName','imgUrl'] 
        }]
    }).then(pattern => {
        Member.findAll().then(member => {
            Design.findAll().then(design => {
                res.render('pattern.ejs', {pattern, member, design})
            })
        })
    })
};

const renderEdit = (req, res) => {
    Pattern.findByPk(req.params.index).then(pattern => {
        res.render("edit.ejs", { pattern });
    })
};

const postEdit = (req, res) => {
    Pattern.update(req.body, {
        where: { 
            id: req.params.index 
        }}
        ).then(pattern => {
        res.redirect(`/${pattern.patternType}/${pattern.id}`);
    })
};

const deletePattern = (req, res) => {
    Pattern.destroy({where: { id: req.params.index }}).then(() => {
        res.redirect('/');
    });
};

    module.exports = {
        index,
        renderNew,
        postNew,
        showPattern,
        renderEdit,
        postEdit,
        deletePattern
    }