import React, { useState } from 'react';
import { staticResource } from '@/utils/resources';
import Link from 'next/link';
import Image from 'next/image';
import arrowRight from '@/public/icons/arrowBtnWhite.svg';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useStore } from 'effector-react';
import { $currencies } from '@/store/currencies';
import { useTranslations } from 'next-intl';

interface IProps {
	image: string;
	logoImage: string;
	url: string;
}

const GoodsCard = ( { image, logoImage, url }: IProps ) => {
	const size = useWindowSize();
	const t = useTranslations('Index');
	// @ts-ignore
	const isMobile = size.width <= 1400;

	const [ mouseOver, setMouseOver ] = useState<boolean>( false );
	const [ mobileShowContent, setMobileShowContent ] = useState<boolean>( false );

	const onMouseOver = () => {
		setMouseOver( true );
	};
	const onMouseLeave = () => {
		setMouseOver( false );
	};

	const toMobileShowContent = () => {
		setMobileShowContent( !mobileShowContent );
	};

	const currency = useStore( $currencies );
	const currenciesLS = localStorage.getItem( 'currency' );
	let objFromStringLocalStorage = { value: currenciesLS, label: currenciesLS };

	let cur;

	switch ( objFromStringLocalStorage.value || currency.value ) {
		case 'usd':
			cur = '$';
			break;
		case 'rub':
			cur = '₽';
			break;
		case 'thb':
			cur = '฿';
			break;
	}

	const bgAccentOpacity = {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'rgba(0, 0, 0, .5)',
		zIndex: 3,
		transition: 'all .5s',
	};

	const styleBg = !mouseOver ? bgAccentOpacity : {};

	// const bgGradientBlack = {
	// 	position: 'absolute',
	// 	top: 0,
	// 	left: 0,
	// 	bottom: 0,
	// 	zIndex: 3,
	// 	background: 'linear-gradient(0deg, #252525, transparent)',
	// 	height: '150px',
	// };
	//
	// const styleGradientBg = (!isMobile && mouseOver) ? bgGradientBlack : {};

	const showContent = {
		opacity: 1,
		transition: 'opacity .5s',
	};

	const displayNone = {
		opacity: 0,
		transition: 'opacity .5s',
	};

	const styleShowContent = mouseOver ? showContent : displayNone;
	const styleShowContentReverse = mouseOver ? displayNone : showContent;

	const scaleImage = {
		scale: '1.1',
		transition: 'scale .5s',
	};

	const scaleImageReverse = {
		scale: '1',
		transition: 'scale .5s',
	};

	const styleScaleImage = mouseOver ? scaleImage : scaleImageReverse;

	return (
		<>
			{ isMobile ? (
				<div className={ 'goodsCard' } onClick={ toMobileShowContent }>
					<div className={ 'pos goodsCard-image overflowNoHidden' }>
						<img
							src={ staticResource( image ) }
							alt={ '' }
							className={ 'cardPhoto' }
							style={ styleScaleImage }
						/>

						{ !mobileShowContent && <div style={ styleBg }/> }
						{ !mobileShowContent && ( <div className={ 'bgGradientBlack' } style={ styleShowContent }/> ) }
					</div>
					{ !mobileShowContent && (
						<img
							src={ staticResource( logoImage ) }
							alt={ '' }
							className={ 'cardLogo' }
						/>
					) }
					<Link href={ url } className={ 'mobileLink' }>
						{ mobileShowContent && (
							<div className={ 'cardLabel text300 colorWhite' }>
								{ t('apartments') || '' } | { t('region') || '' }:{ ' ' }
								{ t('surin') || '' }
							</div>
						) }

						{ mobileShowContent && (
							<div className={ 'bottomBg' }>
								<div className={ 'description-wrapper' }>
									<div>
										<div className={ 'text300 colorWhite' }>
											{ t('priceFrom') || '' } { cur }100 000
										</div>
										<div className={ 'text300 colorWhite mt-8' }>
											{ t('income') || '' } 10%{ ' ' }
											{ t('aYear') || '' }
										</div>
									</div>

									<p className={ 'text300 colorWhite' }>
										{ t('more') || '' }{ ' ' }
										<Image src={ arrowRight } alt={ '' }/>
									</p>
								</div>
							</div>
						) }
					</Link>
				</div>
			) : (
				<div
					className={ 'goodsCard' }
					onMouseOver={ onMouseOver }
					onMouseLeave={ onMouseLeave }>
					<Link href={ url }>
						<div className={ 'pos goodsCard-image overflowNoHidden' }>
							<img
								src={ staticResource( image ) }
								alt={ '' }
								className={ 'cardPhoto' }
								style={ styleScaleImage }
							/>

							<div style={ styleBg }/>
						</div>

						<div
							className={ 'cardLabel text300 colorWhite' }
							style={ styleShowContent }>
							{ t('apartments') || '' } | { t('region') || '' }:{ ' ' }
							{ t('surin') || '' }
						</div>

						<img
							src={ staticResource( logoImage ) }
							alt={ '' }
							className={ 'cardLogo' }
							style={ styleShowContentReverse }
						/>

						<div className={ 'bottomBg' }>
							<div
								className={ 'description-wrapper' }
								style={ styleShowContent }>
								<div>
									<div className={ 'text300 colorWhite' }>
										{ t('priceFrom') || '' } { cur }100 000
									</div>
									<div className={ 'text300 colorWhite mt-8' }>
										{ t('income')|| '' } 10%{ ' ' }
										{ t('aYear') || '' }
									</div>
								</div>
								<p className={ 'text300 colorWhite' }>
									{ t('more') || '' }{ ' ' }
									<Image src={ arrowRight } alt={ '' }/>
								</p>
							</div>
						</div>
					</Link>
				</div>
			) }
		</>
	);
};

export default GoodsCard;
