const router = require('express').Router();
const { Contact } = require('../../src/db');
const { Op } = require('sequelize');
const { check, validationResult } = require('express-validator');

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
router.post('/',
  check('name')
    .notEmpty().withMessage('El campo de nombre es requerido'),
  check('phone')
    .notEmpty().withMessage('El campo de teléfono es requerido')
    .isInt().withMessage('El campo de teléfono debe de ser númerico'),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        success: false,
        errors: errors.array()
      });
    }

    req.body.userId = req.user.id;
    const contact = await Contact.create(req.body);
    res.json({
      success: true,
      contact
    });
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
  await Contact.update(req.body, {
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
  await Contact.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.json({
      success: true
    });
  });
})

module.exports = router;
