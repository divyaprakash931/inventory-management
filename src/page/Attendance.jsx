import React, { useState, useEffect } from 'react';

const employees = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
];

// Generate days for the current month in day/month/year format
const getDaysInMonth = () => {
  const days = [];
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= totalDays; day++) {
    days.push({
      date: `${day}/${month + 1}/${year}`,
      isSunday: new Date(year, month, day).getDay() === 0, // 0 is Sunday
    });
  }

  return days;
};

const daysOfMonth = getDaysInMonth();

const Attendance = () => {
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    // Load attendance data from local storage
    const data = localStorage.getItem('attendanceData');
    if (data) {
      const parsedData = JSON.parse(data);
      const initialAttendance = {};

      // Populate the initial attendance state
      for (let i = 1; i < parsedData.length; i++) { // Skip header
        const [employeeId, employeeName, date, present, timeIn, timeOut] = parsedData[i];
        if (!initialAttendance[employeeId]) {
          initialAttendance[employeeId] = {};
        }
        initialAttendance[employeeId][date] = {
          present: present === 'Yes',
          timeIn,
          timeOut,
          employeeName, // Add employee name to attendance data
        };
      }
      setAttendance(initialAttendance);
    } else {
      // If no data exists, initialize it with employee names
      const initialData = [["Employee ID", "Employee Name", "Date", "Present", "Time In", "Time Out"]];
      employees.forEach(emp => {
        const employeeId = emp.id;
        daysOfMonth.forEach(day => {
          initialData.push([employeeId, emp.name, day.date, 'No', '', '']);
        });
      });
      localStorage.setItem('attendanceData', JSON.stringify(initialData));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever attendance state changes
    const attendanceArray = [["Employee ID", "Employee Name", "Date", "Present", "Time In", "Time Out"]];
    
    for (const employeeId in attendance) {
      for (const date in attendance[employeeId]) {
        const { present, timeIn, timeOut, employeeName } = attendance[employeeId][date];
        attendanceArray.push([
          employeeId,
          employeeName, // Add employee name here
          date,
          present ? 'Yes' : 'No',
          timeIn,
          timeOut,
        ]);
      }
    }

    // Only update local storage if attendanceArray is not empty
    if (attendanceArray.length > 1) {
      localStorage.setItem('attendanceData', JSON.stringify(attendanceArray));
    }
  }, [attendance]);

  const handleCheckboxChange = (employeeId, day) => {
    setAttendance((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: {
          ...prev[employeeId]?.[day],
          present: !prev[employeeId]?.[day]?.present,
        },
      },
    }));
  };

  const handleTimeChange = (employeeId, day, type, value) => {
    setAttendance((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: {
          ...prev[employeeId]?.[day],
          [type]: value,
        },
      },
    }));
  };

  const calculateTotalDaysPresent = (employeeId) => {
    const records = attendance[employeeId] || {};
    return Object.values(records).filter(record => record?.present).length;
  };

  const calculateTotalHours = (employeeId) => {
    const records = attendance[employeeId] || {};
    let totalHours = 0;

    Object.entries(records).forEach(([_, record]) => {
      if (record?.present) {
        const { timeIn, timeOut } = record;
        if (timeIn && timeOut) {
          const inTime = new Date(`1970-01-01T${timeIn}:00`);
          const outTime = new Date(`1970-01-01T${timeOut}:00`);
          const hoursWorked = (outTime - inTime) / (1000 * 60 * 60); // Convert ms to hours
          totalHours += hoursWorked;
        }
      }
    });

    return totalHours.toFixed(2); // Return total hours as a fixed decimal
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Attendance</h1>
      <div className="overflow-x-auto">
        <table className="overflow-x-auto mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Employee</th>
              {daysOfMonth.map(({ date, isSunday }) => (
                <th key={date} className={`py-2 px-4 border ${isSunday ? 'bg-red-200' : ''}`}>
                  {date}
                </th>
              ))}
              <th className="py-2 px-4 border">Total Present</th>
              <th className="py-2 px-4 border">Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 border">{employee.name}</td>
                {daysOfMonth.map(({ date, isSunday }) => (
                  <td key={date} className={`py-2 px-4 border text-center ${isSunday ? 'bg-red-100' : ''}`}>
                    <input
                      type="checkbox"
                      checked={attendance[employee.id]?.[date]?.present || false}
                      onChange={() => handleCheckboxChange(employee.id, date)}
                      className="form-checkbox"
                    />
                    <div>
                      <input
                        type="time"
                        value={attendance[employee.id]?.[date]?.timeIn || ''}
                        onChange={(e) => handleTimeChange(employee.id, date, 'timeIn', e.target.value)}
                        className="form-input"
                      />
                      <input
                        type="time"
                        value={attendance[employee.id]?.[date]?.timeOut || ''}
                        onChange={(e) => handleTimeChange(employee.id, date, 'timeOut', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </td>
                ))}
                <td className="py-2 px-4 border text-center">
                  {calculateTotalDaysPresent(employee.id)}
                </td>
                <td className="py-2 px-4 border text-center">
                  {calculateTotalHours(employee.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
