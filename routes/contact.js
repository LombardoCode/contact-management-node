const router = require('express').Router();
const { User, Contact } = require('../src/db');
const { Op } = require('sequelize');

router.get('/edit/:id', async (req, res) => {
  // Getting the specific contact
  const contact = await Contact.findOne({
    where: {
      id: {
        [Op.eq]: req.params.id
      },
      userId: {
        [Op.eq]: req.user.id
      }
    }
  });

  if (contact) {
    return res.render('auth/contact/edit', {
      layout : 'main',
      data: {
        contact: contact.dataValues
      }
    });
  } else {
    res.send(401);
  }
});

router.get('/delete/:id', async (req, res) => {
  // Getting the specific contact
  const contact = await Contact.findOne({
    where: {
      id: {
        [Op.eq]: req.params.id
      },
      userId: {
        [Op.eq]: req.user.id
      }
    }
  });

  if (contact) {
    return res.render('auth/contact/delete', {
      layout : 'main',
      data: {
        contact: contact.dataValues
      }
    });
  } else {
    res.send(401);
  }
})


module.exports = router;
