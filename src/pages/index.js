import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan aliquam faucibus. Nullam vitae magna nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi turpis dui, ultricies et nulla suscipit, blandit tristique quam. Vivamus lacinia tempor lectus non ullamcorper. Fusce vulputate augue sed elit bibendum tempus. Ut scelerisque, erat sit amet egestas rutrum, ante nisl pharetra neque, in consequat mauris neque eu ipsum. Ut efficitur consectetur odio et eleifend. Cras id justo id augue commodo aliquet vitae id quam. Ut pulvinar, nulla sed finibus consectetur, mi diam placerat nulla, placerat ultricies turpis eros ut augue.

Mauris tempus risus nec arcu condimentum, lacinia ultricies nisl bibendum. Sed purus diam, sagittis sed luctus in, mattis at erat. Curabitur vestibulum ultrices venenatis. Ut nec tempus ligula, vel fermentum nisi. Fusce nec mollis sem, eget pharetra orci. Nullam venenatis, nulla euismod laoreet molestie, nibh ipsum sollicitudin mauris, a commodo odio sem vel nibh. Quisque sit amet libero sed leo scelerisque dignissim id non neque.

Donec id neque pretium lorem efficitur convallis id sit amet ligula. Donec at dictum purus. Fusce eget efficitur metus. Nunc lobortis commodo nibh, in lacinia neque placerat vitae. In suscipit ex nisi, non aliquam est cursus vel. Aliquam quis pharetra nunc. Suspendisse potenti. Morbi lorem erat, ullamcorper vitae ultrices sit amet, condimentum vitae dolor. Aenean commodo bibendum massa, at maximus elit placerat quis. Pellentesque sollicitudin porttitor quam sit amet mollis. Nullam pulvinar felis nec leo scelerisque, ut laoreet sapien fringilla. Vestibulum lacinia leo ut venenatis suscipit.

Mauris id semper purus, eget scelerisque purus. Ut quis malesuada ante. Donec eleifend, tortor ut venenatis bibendum, tellus mauris varius tortor, ut porttitor eros libero in dolor. In a tristique ex. Quisque auctor leo erat, aliquet egestas ipsum luctus ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin at magna vitae diam sagittis scelerisque vitae fringilla sapien. Duis fermentum a odio sed hendrerit. Nulla tempor euismod lacinia. Integer eget tellus sed neque laoreet mollis quis at ipsum. Fusce ornare est purus, non convallis felis hendrerit in. Vestibulum lobortis odio sit amet risus faucibus auctor.

Nunc sagittis lectus nec enim suscipit, sit amet rutrum velit eleifend. In ex turpis, finibus nec est eu, volutpat fermentum ipsum. Donec volutpat vel elit eget eleifend. Sed vehicula tempus quam, at tempus ante accumsan ac. Donec dapibus lectus id varius venenatis. Donec at lacinia est. Integer eu urna in orci tempus convallis in sed dui. Nunc ut nulla lorem. Aenean efficitur dapibus dui, in fermentum ante sagittis vel. Nulla sit amet ullamcorper lorem.
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link> <br />
      <Link to="/using-ssr">Go to "Using SSR"</Link> <br />
      <Link to="/using-dsg">Go to "Using DSG"</Link>
    </p>
  </Layout>
)

export default IndexPage
