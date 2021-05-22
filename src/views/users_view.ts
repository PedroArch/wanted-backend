import User from '../models/User'

export default {
  render(user: User){
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      city: user.city,
      state: user.state,
      birthday: user.birthday,
      avatar: `http://localhost:3333/uploads/${user.avatar}`,
    };
  },

  renderMany(users: User[]){
    return users.map(user => this.render(user))
  }
}