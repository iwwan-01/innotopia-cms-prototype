import Link from 'next/link'

const CTA = () => {
  return (
    <section>
      {/* Main Wrapper */}
      {/* overflow-x-hidden fixes the weird white space on the right side in mobile view! */}
      <div className='flex flex-col justify-center items-center bg-dark-blue w-full overflow-x-hidden'>
        {/* Text Wrapper */}
        <div className='flex flex-col justify-center items-center text-center font-poppins p-14'>
          <h1 className='font-poppins text-white md:text-2xl lg:text-3xl text-2xl font-bold z-10 py-4'>
            We are here to help
          </h1>
          {/* Underline Effect */}
          <p className='font-light text-white px-10 py-4 pb-10 md:px-24 max-w-3xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            voluptatibus sapiente quos dolor esse dolorem repudiandae illo earum
            molestias eum aperiam ullam corporis eos, sunt, maiores officiis a
            at autem? Quos expedita necessitatibus reiciendis modi voluptatum
            recusandae sed, enim velit et fuga suscipit labore consequuntur!
          </p>
          {/* CTA */}
          <Link href='#contact'>
            <div className='flex justify-center items-center rounded-xl bg-lime-green w-40 h-10'>
              <span className='uppercase font-bold'>Get in touch</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
export default CTA
