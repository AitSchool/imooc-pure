﻿import { HTTP } from '../utils/http.js'
// import { ClassicStorage } from '../models/classic-storage.js'

class ClassicModel extends HTTP {
	prefix = 'classic'

	constructor() {
		super()
	}

	getLatest(sCallback) {
		/* async */
		this.request({
			url: 'classic/latest',
			success: data => {
				this._setLatestIndex(data.index)
				sCallback(data)
			}
		})
	}

	// getPrevious(index, sCallback) {
	// 	this._getClassic(index, 'previous', sCallback)
	// }

	// getNext(index, sCallback) {
	// 	this._getClassic(index, 'next', sCallback)
	// }

	// _getClassic(index, next_or_previous, sCallback) {
	// 	let key =
	// 		next_or_previous === 'next'
	// 			? this._fullKey(index + 1)
	// 			: this._fullKey(index - 1)
	// 	let classic = wx.getStorageSync(key)
	// 	if (!classic) {
	// 		let params = {
	// 			url: 'classic/' + index + '/' + next_or_previous,
	// 			success: data => {
	// 				let key = this._fullKey(data.index)
	// 				wx.setStorageSync(key, data)
	// 				sCallback(data)
	// 			}
	// 		}
	// 		this.request(params)
	// 	} else {
	// 		sCallback(classic)
	// 	}
	// }

	getClassic(index, next_or_previous, sCallback) {
		/* 缓存中寻找, 写入缓存中 */
		/* 确定 key */
		this.request({
			url: 'classic/' + index + '/' + next_or_previous,
			success: res => {
				sCallback(res)
			}
		})
	}

	isFirst(index) {
		if (index == 1) {
			return true
		} else return false
	}

	isLatest(index) {
		let key = this._fullKey('latest-' + index)
		let latestIndex = wx.getStorageSync(key)
		if (latestIndex) {
			if (index === latestIndex) {
				return true
			}
		} else return false
	}

	/**
	 * 在缓存中存放最新一期的期数
	 */
	_setLatestIndex(index) {
		let key = this._fullKey('latest-' + index)
		wx.setStorageSync(key, index)
	}

	_fullKey(partKey) {
		let key = this.prefix + '-' + partKey
		return key
	}
}

export { ClassicModel }
