const model = require("../models/model");

//post
const create_Categories = async (req, res) => {
  const Create = new model.Categories({
    type: "Expense",
    color: "#C43095",
  });

  await Create.save((err) => {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  });
};

//get
const get_Categories = async (req, res) => {
  let data = await model.Categories.find({});

  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
};

//post http://localhost:4000/api/transaction
const create_Transaction = async (req, res) => {
  if (!req.body) return res.status(400).json("Post HTTTP Data not provided");
  let { name, type, amount } = req.body;

  const create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });
  create.save((err) => {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Error while creating transaction ${err}` });
  });
};
//get http://localhost:4000/api/transaction
const get_Transaction = async (req, res) => {
  let data = await model.Transaction.find({});
  return res.json(data);
};
//delete http://localhost:4000/api/transaction

const delete_Transaction = async (req, res) => {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await model.Transaction.deleteOne(req.body, (err) => {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch((err) => res.json("Error while deleting transaction"));
};

//get http://localhost:4000/api/labels

const get_Labels = async (req, res) => {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );

      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Looup Collection Error");
    });
};

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
};
