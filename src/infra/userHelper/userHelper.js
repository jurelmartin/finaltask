let data;

exports.setList = (list) =>{
  return data = list;
};

exports.findByPk = (id) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        return resolve(data[i]);
      }
    }
    return reject(null);
  });
};