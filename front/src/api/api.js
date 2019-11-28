import session from './session';
import router from '../router';

class APIconstructor {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    return session.post(
      `/api/${this.model}/`.toLowerCase(),
      data
    )
      .then(response => {
        return response.data;
      })
      .catch((e) => {
        if (e.response.status === 403) {
          return router.push('/logout/');
        } else {
          throw e;
        }
      });
  }

  list(data = {}) {
    let str = '?';
    for (const [key, value] of Object.entries(data)) {
      str = str + key + '=' + value + '&';
    }
    return session.get(
      `/api/${this.model}/${str}`.toLowerCase()
    )
      .then(response => {
        return response.data;
      })
      .catch((e) => {
        if (e.response.status === 403) {
          return router.push('/logout/');
        } else {
          throw e;
        }
      });
  }

  get(id) {
    return session.get(
      `/api/${this.model}/${id}/`.toLowerCase()
    )
      .then(response => {
        return response.data;
      })
      .catch((e) => {
        if (e.response.status === 403) {
          return router.push('/logout/');
        } else {
          throw e;
        }
      });
  }

  update(id, data) {
    return session.put(
      `/api/${this.model}/${id}/`.toLowerCase(),
      data,
    )
      .then(response => {
        return response.data;
      })
      .catch((e) => {
        if (e.response.status === 403) {
          return router.push('/logout/');
        } else {
          throw e;
        }
      });
  }

  delete(data) {
    return session.delete(
      `/api/${this.model}/${data.id}/`.toLowerCase()
    )
      .then(response => {
        return response.data;
      })
      .catch((e) => {
        if (e.response.status === 403) {
          return router.push('/logout/');
        } else {
          throw e;
        }
      });
  }
}

const gallery = new APIconstructor('Gallery');
const image = new APIconstructor('Image');
const comments = new APIconstructor('comments');
const job = new APIconstructor('job');

const API = {
  gallery: gallery,
  image: image,
  comments: comments,
  job: job,
};

export default API;
