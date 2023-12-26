import { fromJS } from 'immutable';
import provinces from './provinces.json';
import areas from './areas.json';
import cities from './cities.json';

/**
 * 获取省份与地市的层级结构数据
 */
export function findProvinceCity() {
  //将省份与地市构造成父子结构
  const citiesIm = fromJS(cities);
  const initProvinces = fromJS(provinces).map((province) => {
    province = province.set('children', fromJS([]));
    citiesIm.forEach((city) => {
      if (province.get('code') == city.get('parent_code')) {
        province = province.set(
          'children',
          province.get('children').push(city)
        );
      }
    });
    return province;
  });
  return initProvinces;
}

/**
 * 查询省
 * @param code
 * @returns {string}
 */
export function findProviceName(code) {
  for (let p of provinces) {
    if (p.code == code) {
      return p.name;
    }
  }
  return '';
}

/**
 * 查询区
 * @param code
 * @returns {string}
 */
export function findArea(code) {
  for (let a of areas) {
    if (code == a.code) {
      return a.name;
    }
  }
  return '';
}

/**
 * 查询市
 * @param code
 * @returns {string}
 */
export function findCity(code) {
  for (let c of cities) {
    if (code == c.code) {
      return c.name;
    }
  }
  return '';
}

/**
 *  省市区字符串 返回 `江苏省/南京市/雨花台区`
 * @param provinceCode
 * @param cityCode
 * @param areaCode
 * @returns {string}
 */
export function addressInfo(provinceCode, cityCode, areaCode) {
  if (provinceCode) {
    if (cityCode) {
      let proviceName = `${findProviceName(provinceCode)}`;
      let cityName = `${findCity(cityCode)}`;

      if (proviceName === cityName) {
        return `${cityName}${findArea(areaCode)}`;
      } else {
        return `${proviceName}${cityName}${findArea(areaCode)}`;
      }
    } else {
      return `${findProviceName(provinceCode)}`;
    }
  }

  return '请选择所在地区';
}

/**
 * 查询省code
 * @param name
 * @returns {string}
 */
export function findProviceCode(name) {
  for (let c of provinces) {
    if (name == c.name) {
      return c.code;
    }
  }
  return '';
}

/**
 * 查询市code
 * @param name
 * @returns {string}
 */
export function findCityCode(name) {
  for (let c of cities) {
    if (name == c.name) {
      return c.code;
    }
  }
  return '';
}

/**
 * 查询区code
 * @param name
 * @returns {string}
 */
export function findAreaCode(name) {
  for (let a of areas) {
    if (name === a.name) {
      return a.code;
    }
  }
  return '';
}