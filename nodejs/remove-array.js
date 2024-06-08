// @ts-check

module.exports = {
    removeArray,
}

function removeArray(list, el) {
    const index = list.indexOf(el);
    if (index !== -1) {
      list.splice(index, 1);
    }
    return list;
  }