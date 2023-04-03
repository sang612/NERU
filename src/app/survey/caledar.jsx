import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

export default function Caledar({
  children,
  defaultYear,
  defaultMonth,
  defaultDay,
  yearState,
  setYearState,
  dateState,
  setDateState,
  monthState,
  setMonthState,
}) {
  const [dateRenderState, setDateRenderState] = useState([]);
  const [monthRenderState, setMonthRenderState] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label: i + 1,
    }))
  );
  const year = new Date().getFullYear();
  const months = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const realYear = year - 1899;
  const years = Array.from({ length: realYear }, (_, i) => ({
    value: i + 1900,
    label: i + 1900,
  })).reverse();

  const handleChangeYear = (value) => {
    setYearState(parseInt(value));
    if (parseInt(value) === parseInt(year)) {
      if (monthState > months) {
        setMonthState();
      }
      if (monthState > months && dateState > day) {
        setDateState();
      }
      return setMonthRenderState(
        Array.from({ length: months }, (_, i) => ({
          value: i + 1,
          label: i + 1,
        }))
      );
    }
    setMonthRenderState(
      Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: i + 1,
      }))
    );
  };
  const handleChangeMonth = (value) => {
    setMonthState(parseInt(value));
  };
  const handleChangeDay = (value) => {
    setDateState(parseInt(value));
  };
  useEffect(() => {
    if (yearState === defaultYear) {
      setMonthRenderState(
        Array.from({ length: months }, (_, i) => ({
          value: i + 1,
          label: i + 1,
        }))
      );
    }
    if (monthState === defaultMonth) {
      setDateRenderState(
        Array.from({ length: day }, (_, i) => ({
          value: i + 1,
          label: i + 1,
        }))
      );
    }
  }, [day, defaultMonth, defaultYear, monthState, months, yearState]);
  useEffect(() => {
    if (defaultYear && defaultMonth && defaultDay) {
      setDateState(defaultDay);
      setMonthState(defaultMonth);
      setYearState(defaultYear);
    }
  }, [defaultDay, defaultMonth, defaultYear, setDateState, setMonthState, setYearState]);

  useEffect(() => {
    function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    function getTotalDaysInMonth(month) {
      const isLeap = isLeapYear(yearState);
      const daysInMonth = new Date(yearState, month, 0).getDate();
      if (month === 2 && isLeap) {
        return 29;
      } else {
        return daysInMonth;
      }
    }
    const totalDaysInMonth = getTotalDaysInMonth(monthState);
    if (dateState > totalDaysInMonth) {
      setDateState();
    }
    if (parseInt(year) === yearState && parseInt(months) === monthState) {
      return setDateRenderState(
        Array.from({ length: day }, (_, i) => ({
          value: i + 1,
          label: i + 1,
        }))
      );
    }
    setDateRenderState(
      Array.from({ length: totalDaysInMonth }, (_, i) => ({
        value: i + 1,
        label: i + 1,
      }))
    );
  }, [dateState, day, monthState, months, setDateState, year, yearState]);
  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-2">
          <Select
            onChange={handleChangeYear}
            defaultValue={defaultYear || 'Year'}
            style={{
              border: `${children ? '2.1px solid red' : '2.1px solid rgb(80, 195, 197)'}`,
              borderRadius: '.6rem',
              width: '100%',
            }}
            options={years}
            size="large"
          />
          <Select
            defaultValue={defaultMonth || 'Month'}
            onChange={handleChangeMonth}
            value={monthState}
            style={{
              border: `${children ? '2.1px solid red' : '2.1px solid rgb(80, 195, 197)'}`,
              borderRadius: '.6rem',
              width: '100%',
            }}
            options={monthRenderState}
            size="large"
          />
          <Select
            defaultValue={defaultDay || 'Day'}
            value={dateState}
            onChange={handleChangeDay}
            style={{
              border: `${children ? '2.1px solid red' : '2.1px solid rgb(80, 195, 197)'}`,
              borderRadius: '.6rem',
              width: '100%',
            }}
            options={dateRenderState}
            size="large"
          />
        </div>
        <div className="mx-3 my-2 text-sm font-normal text-error">{children}</div>
      </div>
    </>
  );
}
