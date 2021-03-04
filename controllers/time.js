const asyncHandler = require('../middleware/async');
const { Time } = require('../models');

/**
 * @desc set wait time
 * @route time
 * @access Private/admin
 */
exports.setTime = asyncHandler(async (req, res, next) => {
  const times = await Time.findAll();
  if (times.length == 0) {
    const time = await Time.create({ time: req.body.time });
    res.json(time);
  } else {
    const time = times[0];
    time.time = req.body.time;
    await time.save();
    res.json(time);
  }
});

/**
 * @desc get wait time
 * @route time
 * @access Public
 */
exports.getTime = asyncHandler(async (req, res, next) => {
  const times = await Time.findAll();
  if (times.length == 0) {
    res.json({ time: 0 });
  } else {
    const time = times[0];
    res.json(time);
  }
});
