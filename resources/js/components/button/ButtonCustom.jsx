import React from 'react'

export default function ButtonCustom(props) {
	const { text } = props
	return (
		<button className='btn-custom'>
			{text}
		</button>
	)
}
