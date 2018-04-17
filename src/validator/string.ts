/// <reference types="validator"/>

import validator = require('validator');
import NormalizeEmailOptions = ValidatorJS.NormalizeEmailOptions;
import AlphaLocale = ValidatorJS.AlphaLocale;
import AlphanumericLocale = ValidatorJS.AlphanumericLocale;
import IsByteLengthOptions = ValidatorJS.IsByteLengthOptions;
import IsCurrencyOptions = ValidatorJS.IsCurrencyOptions;
import IsEmailOptions = ValidatorJS.IsEmailOptions;
import IsFQDNOptions = ValidatorJS.IsFQDNOptions;
import IsFloatOptions = ValidatorJS.IsFloatOptions;
import IsIntOptions = ValidatorJS.IsIntOptions;
import IsLengthOptions = ValidatorJS.IsLengthOptions;
import MobilePhoneLocale = ValidatorJS.MobilePhoneLocale;
import IsURLOptions = ValidatorJS.IsURLOptions;
import { ValueCheckerAbstract, ValueSanitizerAbstract } from './base';

export class ValueCheckerString extends ValueCheckerAbstract {
	contains(elem: any) {
		this.list.push({debugTitle: 'contains', validate: validator.contains, argument: arguments});
		return this;
	}
	
	equals(comparison: string) {
		this.list.push({debugTitle: 'equals', validate: validator.equals, argument: arguments});
		return this;
	}
	
	isAfter(date?: string) {
		this.list.push({debugTitle: 'isAfter', validate: validator.isAfter, argument: arguments});
		return this;
	}
	
	isAlpha(locale?: AlphaLocale) {
		this.list.push({debugTitle: 'isAlpha', validate: validator.isAlpha, argument: arguments});
		return this;
	}
	
	isAlphanumeric(locale?: AlphanumericLocale) {
		this.list.push({debugTitle: 'isAlphanumeric', validate: validator.isAlphanumeric, argument: arguments});
		return this;
	}
	
	isAscii() {
		this.list.push({debugTitle: 'isAscii', validate: validator.isAscii, argument: arguments});
		return this;
	}
	
	isBase64() {
		this.list.push({debugTitle: 'isBase64', validate: validator.isBase64, argument: arguments});
		return this;
	}
	
	isBefore(date?: string) {
		this.list.push({debugTitle: 'isBefore', validate: validator.isBefore, argument: arguments});
		return this;
	}
	
	isBoolean() {
		this.list.push({debugTitle: 'isBoolean', validate: stringIsBoolean, argument: arguments});
		return this;
	}
	
	isByteLength(options: IsByteLengthOptions): this;
	isByteLength(min: number, max?: number): this;
	isByteLength(options: IsByteLengthOptions|number, max?: number) {
		this.list.push({debugTitle: 'isByteLength', validate: validator.isByteLength, argument: arguments});
		return this;
	}
	
	isCreditCard() {
		this.list.push({debugTitle: 'isCreditCard', validate: validator.isCreditCard, argument: arguments});
		return this;
	}
	
	isCurrency(options?: IsCurrencyOptions) {
		this.list.push({debugTitle: 'isCurrency', validate: validator.isCurrency, argument: arguments});
		return this;
	}
	
	isDataURI() {
		this.list.push({debugTitle: 'isDataURI', validate: validator.isDataURI, argument: arguments});
		return this;
	}
	
	isDecimal() {
		this.list.push({debugTitle: 'isDecimal', validate: validator.isDecimal, argument: arguments});
		return this;
	}
	
	isDivisibleBy(number: number) {
		this.list.push({debugTitle: 'isDivisibleBy', validate: validator.isDivisibleBy, argument: arguments});
		return this;
	}
	
	isEmail(options?: IsEmailOptions) {
		this.list.push({debugTitle: 'isEmail', validate: validator.isEmail, argument: arguments});
		return this;
	}
	
	isEmpty() {
		this.list.push({debugTitle: 'isEmpty', validate: validator.isEmpty, argument: arguments});
		return this;
	}
	
	isFQDN(options?: IsFQDNOptions) {
		this.list.push({debugTitle: 'isFQDN', validate: validator.isFQDN, argument: arguments});
		return this;
	}
	
	isFloat(options?: IsFloatOptions) {
		this.list.push({debugTitle: 'isFloat', validate: validator.isFloat, argument: arguments});
		return this;
	}
	
	isFullWidth() {
		this.list.push({debugTitle: 'isFullWidth', validate: validator.isFullWidth, argument: arguments});
		return this;
	}
	
	isHalfWidth() {
		this.list.push({debugTitle: 'isHalfWidth', validate: validator.isHalfWidth, argument: arguments});
		return this;
	}
	
	isHexColor() {
		this.list.push({debugTitle: 'isHexColor', validate: validator.isHexColor, argument: arguments});
		return this;
	}
	
	isHexadecimal() {
		this.list.push({debugTitle: 'isHexadecimal', validate: validator.isHexadecimal, argument: arguments});
		return this;
	}
	
	isIP(version?: number) {
		this.list.push({debugTitle: 'isIP', validate: validator.isIP, argument: arguments});
		return this;
	}
	
	isISBN(version?: number) {
		this.list.push({debugTitle: 'isISBN', validate: validator.isISBN, argument: arguments});
		return this;
	}
	
	isISIN() {
		this.list.push({debugTitle: 'isISIN', validate: validator.isISIN, argument: arguments});
		return this;
	}
	
	isISO8601() {
		this.list.push({debugTitle: 'isISO8601', validate: validator.isISO8601, argument: arguments});
		return this;
	}
	
	isIn(values: any[]) {
		this.list.push({debugTitle: 'isIn', validate: validator.isIn, argument: arguments});
		return this;
	}
	
	isInt(options?: IsIntOptions) {
		this.list.push({debugTitle: 'isInt', validate: validator.isInt, argument: arguments});
		return this;
	}
	
	isJSON() {
		this.list.push({debugTitle: 'isJSON', validate: validator.isJSON, argument: arguments});
		return this;
	}
	
	isLength(options: IsLengthOptions): this;
	isLength(min: number, max?: number): this;
	isLength(min: number|IsLengthOptions, max?: number) {
		this.list.push({debugTitle: 'isLength', validate: validator.isLength, argument: arguments});
		return this;
	}
	
	isLowercase() {
		this.list.push({debugTitle: 'isLowercase', validate: validator.isLowercase, argument: arguments});
		return this;
	}
	
	isMACAddress() {
		this.list.push({debugTitle: 'isMACAddress', validate: validator.isMACAddress, argument: arguments});
		return this;
	}
	
	isMD5() {
		this.list.push({debugTitle: 'isMD5', validate: validator.isMD5, argument: arguments});
		return this;
	}
	
	isMobilePhone(locale: MobilePhoneLocale) {
		this.list.push({debugTitle: 'isMobilePhone', validate: validator.isMobilePhone, argument: arguments});
		return this;
	}
	
	isMongoId() {
		this.list.push({debugTitle: 'isMongoId', validate: validator.isMongoId, argument: arguments});
		return this;
	}
	
	isMultibyte() {
		this.list.push({debugTitle: 'isMultibyte', validate: validator.isMultibyte, argument: arguments});
		return this;
	}
	
	isNotEmpty() {
		this.list.push({debugTitle: 'isNotEmpty', validate: v => !validator.isEmpty(v), argument: arguments});
		return this;
	}
	
	isNumeric() {
		this.list.push({debugTitle: 'isNumeric', validate: validator.isNumeric, argument: arguments});
		return this;
	}
	
	isSurrogatePair() {
		this.list.push({debugTitle: 'isSurrogatePair', validate: validator.isSurrogatePair, argument: arguments});
		return this;
	}
	
	isURL(options?: IsURLOptions) {
		this.list.push({debugTitle: 'isURL', validate: validator.isURL, argument: arguments});
		return this;
	}
	
	isUUID(version?: string|number) {
		this.list.push({debugTitle: 'isUUID', validate: validator.isUUID, argument: arguments});
		return this;
	}
	
	isUppercase() {
		this.list.push({debugTitle: 'isUppercase', validate: validator.isUppercase, argument: arguments});
		return this;
	}
	
	isVariableWidth() {
		this.list.push({debugTitle: 'isVariableWidth', validate: validator.isVariableWidth, argument: arguments});
		return this;
	}
	
	isWhitelisted(chars: string|string[]) {
		this.list.push({debugTitle: 'isWhitelisted', validate: validator.isWhitelisted, argument: arguments});
		return this;
	}
	
	matches(pattern: string, modifiers: string): this;
	matches(pattern: RegExp): this;
	matches(pattern: string|RegExp, modifiers?: string) {
		this.list.push({debugTitle: 'matches', validate: validator.matches, argument: arguments});
		return this;
	}
}

export class ValueSanitizerString extends ValueSanitizerAbstract {
	blacklist(chars: string) {
		this.list.push({debugTitle: 'blacklist', sanitize: validator.blacklist, argument: arguments});
		return this;
	}
	
	escape() {
		this.list.push({debugTitle: 'escape', sanitize: validator.escape, argument: arguments});
		return this;
	}
	
	ltrim(chars?: string) {
		this.list.push({debugTitle: 'ltrim', sanitize: validator.ltrim, argument: arguments});
		return this;
	}
	
	normalizeEmail(options?: NormalizeEmailOptions) {
		this.list.push({debugTitle: 'normalizeEmail', sanitize: validator.normalizeEmail, argument: arguments});
		return this;
	}
	
	rtrim(chars?: string) {
		this.list.push({debugTitle: 'rtrim', sanitize: validator.rtrim, argument: arguments});
		return this;
	}
	
	stripLow(keep_new_lines?: boolean) {
		this.list.push({debugTitle: 'tripLow', sanitize: validator.stripLow, argument: arguments});
		return this;
	}
	
	toBoolean() {
		this.list.push({
			debugTitle: 'toBoolean',
			sanitize: stringToBoolean,
			argument: arguments,
		});
		return this;
	}
	
	toDate() {
		this.list.push({debugTitle: 'toDate', sanitize: validator.toDate, argument: arguments});
		return this;
	}
	
	toFloat() {
		this.list.push({debugTitle: 'toFloat', sanitize: validator.toFloat, argument: arguments});
		return this;
	}
	
	toInt(radix?: number) {
		this.list.push({debugTitle: 'toInt', sanitize: validator.toInt, argument: arguments});
		return this;
	}
	
	trim(chars?: string) {
		this.list.push({debugTitle: 'trim', sanitize: validator.trim, argument: arguments});
		return this;
	}
	
	unescape() {
		this.list.push({debugTitle: 'unescape', sanitize: validator.unescape, argument: arguments});
		return this;
	}
	
	whitelist(chars: string) {
		this.list.push({debugTitle: 'whitelist', sanitize: validator.whitelist, argument: arguments});
		return this;
	}
}

export function stringIsBoolean(v: any) {
	v = v.trim().toLowerCase();
	if (v === 'yes' || v === '1' || v === 'on' || v === 'true' || v === 'no' || v === '0' || v === 'off' || v === 'false') {
		return true;
	} else {
		return false;
	}
}

export function stringToBoolean(v: any) {
	v = v.trim().toLowerCase();
	if (v === 'yes' || v === '1' || v === 'on' || v === 'true') {
		return true;
	} else if (v === 'no' || v === '0' || v === 'off' || v === 'false') {
		return false;
	} else {
		throw new TypeError(`can't convert ${v} to boolean`);
	}
}
