import PropTypes from "prop-types"
import Slider from "./Slider"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

const RepoSlider = ({ repos }) => {
  return (
    <div>
      <h2 className="my-3 text-gray-300 text-md">Latest Repository</h2>
      <div className="bg-[rgb(13,17,23)] p-4 rounded-lg">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          breakpoints={{
            1280: {
              slidesPerView: 2,
            },
          }}
          spaceBetween={20}
          pagination={{ clickable: true }}
          navigation
          scrollbar={{ draggable: true }}
        >
          {repos.map((repo) => (
            <SwiperSlide key={repo.id}>
              <Slider repo={repo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

RepoSlider.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default RepoSlider
