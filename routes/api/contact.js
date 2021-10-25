const router = require('express').Router();
const { Contact } = require('../../src/db');
const { Op } = require('sequelize');

// Get all contacts
router.get('/', async (req, res) => {
  let loggedInUserId = req.user.id;

  const contacts = await Contact.findAll({
    where: {
      userId: {
        [Op.eq]: loggedInUserId
      }
    }
  });
  res.json(contacts);
})

// Create contact
router.post('/', async (req, res) => {
  req.body.userId = req.user.id;
  const contact = await Contact.create(req.body);
  res.json(contact);
})

// Get specific contact
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findAll({
    where: {
      id: {
        [Op.eq]: id
      }
    }
  })
  res.json(contact);
});

// Update specific contact
router.put('/:id', async (req, res) => {
  const editedContact = await Contact.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    return res.json({
      success: true
    });
  })
})

// Delete a contact
router.delete('/:id', async (req, res) => {
  const contact = await Contact.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(contact);
})

module.exports = router;
