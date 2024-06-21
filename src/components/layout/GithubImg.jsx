import githubImagewebp from "../../assets/githubImagewebp.webp"
import githubImagewebp2x from "../../assets/githubImagewebp2x.webp"
import githubImagepng from "../../assets/githubImagepng.png"
import githubImagepng2x from "../../assets/githubImagepng2x.png"

const GithubImg = () => {
  return (
    <div>
      <picture>
        <source
          srcSet={`${githubImagewebp} 1x, ${githubImagewebp2x} 2x`}
          type="image/webp"
        />
        <img
          src={githubImagepng}
          srcSet={`${githubImagepng} 1x, ${githubImagepng2x} 2x`}
          alt="Github Image"
          className="w-4/5 m-auto"
        />
      </picture>
    </div>
  )
}

export default GithubImg
