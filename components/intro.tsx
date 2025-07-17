import React from 'react'
import Image from 'next/image'
import LogoImage from '@/public/images/LOGO-Final.png'

const title = `Hey I'm ShonH.`
const description = ` I'm a software engineer based in Shenzhen, China.
 I'm passionate about learning new technologies and sharing
 knowledge with others.`

const Intro = () => {
	return (
		<section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center'>
			<div className='mt-2 flex-1 md:mt-0'>
				<h1 className='title no-underline'>
					{title}
				</h1>
				<p className='mt-3 font-light text-muted-foreground'>
					{description}
				</p>
			</div>

			{/* <div className='relative'>
				<Image
					className='flex-1 rounded-lg'
					src={LogoImage}
					alt='ShonH'
					width={175}
					height={175}
					priority
				/>
			</div> */}
		</section>
	)
}

export default Intro
