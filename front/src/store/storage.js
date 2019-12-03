export function set_item(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return 0;
}

export function get_item(key) {
  //
  const val = localStorage.getItem(key);
  let parsed = null;
  try {
    parsed = JSON.parse(val);
  } catch (error) {
    console.log("error");
  }
  return parsed;
}

export function del_item(key) {
  localStorage.removeItem(key);
}

export function create_formdata(data) {
  let formData = new FormData();
  for (let key in data) {
    let value = data[key];
    formData.append(key, value);
  }
  return formData;
}
