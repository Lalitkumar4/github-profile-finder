import PropTypes from "prop-types"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import RepoItem from "./RepoItem"

import "swiper/css"
import "swiper/css/navigation"
import NoContentMsg from "../layout/NoContentMsg"

const RepoSlider = ({ repos }) => {
  return (
    <div>
      <h2 className="my-3 text-gray-300 text-md">Latest Repository</h2>
      <div className="bg-[rgb(13,17,23)] px-4 rounded-lg">
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
          {repos.length > 0 ? (
            repos.map((repo) => (
              <SwiperSlide key={repo.id}>
                <RepoItem repo={repo} />
              </SwiperSlide>
            ))
          ) : (
            <NoContentMsg msg="doesn't have any public repositories yet." />
          )}
        </Swiper>
      </div>
    </div>
  )
}

RepoSlider.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default RepoSlider
