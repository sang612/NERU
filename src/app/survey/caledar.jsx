import React, { useEffect, useState } from 'react';
import { Select, Space } from 'antd';
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
  const year = new Date().getFullYear();
  const realYear = year - 1899;
  const years = Array.from({ length: realYear }, (_, i) => ({
    value: i + 1900,
    label: i + 1900,
  })).reverse();
  const month = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  }));

  const handleChangeYear = (value) => {
    setYearState(parseInt(value));
  };
  const handleChangeMonth = (value) => {
    setMonthState(parseInt(value));
  };
  const handleChangeDay = (value) => {
    setDateState(parseInt(value));
  };
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
    setDateRenderState(
      Array.from({ length: totalDaysInMonth }, (_, i) => ({
        value: i + 1,
        label: i + 1,
      }))
    );
  }, [dateState, monthState, setDateState, yearState]);
  return (
    <>
      <div className="w-full">
        <Space wrap style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Select
            onChange={handleChangeYear}
            defaultValue={defaultYear || 'Year'}
            className="w-[97px] md:w-[155px]"
            style={{
              border: `${children ? '2.1px solid red' : '2.1px solid rgb(80, 195, 197)'}`,
              borderRadius: '.6rem',
            }}
            options={years}
            size="large"
          />
          <Select
            defaultValue={defaultMonth || 'Month'}
            onChange={handleChangeMonth}
            className="w-[97px] md:w-[155px] "
            style={{
              border: `${children ? '2.1px solid red' : '2.1px solid rgb(80, 195, 197)'}`,
              borderRadius: '.6rem',
            }}
            options={month}
            size="large"
          />
          <Select
            defaultValue={defaultDay || 'Day'}
            value={dateState}
            onChange={handleChangeDay}
            className="w-[97px] md:w-[155px]"
            style={{
              border: `${children ? '2.1px solid red' : '2.1px solid rgb(80, 195, 197)'}`,
              borderRadius: '.6rem',
            }}
            options={dateRenderState}
            size="large"
          />
        </Space>
        <div className="mx-3 my-2 text-sm font-normal text-error">{children}</div>
      </div>
    </>
  );
}
