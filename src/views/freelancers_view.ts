import Freelancer from '../models/Freelancer'
import imagesView from '../views/images_view'

export default {
  render(freelancer: Freelancer){
    return {
      id: freelancer.id,
      about: freelancer.about,
      portfolio: freelancer.portfolio,
      latitude: freelancer.latitude,
      longitude: freelancer.longitude,
      mobile: freelancer.mobile,
      type: freelancer.type,
      opening_hours: freelancer.opening_hours,
      open_on_weekends: freelancer.open_on_weekends,
      images: imagesView.renderMany(freelancer.images),
    };
  },

  renderMany(freelancers: Freelancer[]){
    return freelancers.map(freelancer => this.render(freelancer))
  }
}