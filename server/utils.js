
module.exports = {
  respond,
  respondOrRedirect
};

function respond (res, tpl, obj, status) {
  res.format({
    json: () => {
      if (status) return res.status(status).json(obj);
      res.json(obj);
    }
  });
}

function respondOrRedirect ({ req, res }, url = '/', obj = {}, flash) {
  res.format({
    json: () => res.json(obj)
  });
}
