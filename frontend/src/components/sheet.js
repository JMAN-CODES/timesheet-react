import { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-cyan/theme.css";

function TimeSheet() {

    let newObject = window.localStorage.getItem("BAU_activity");
    var [BAU_activity, setBAU_activity] = useState({});
    const [ID, setID] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3000/get_data')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                let BAU_activity_save = data;
                let BAUCopy = Object.assign({}, BAU_activity_save);
                let size = Object.keys(BAUCopy).pop();
                setBAU_activity(BAU_activity_save)
                setID(Number(size) + 1)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [])

    const [TotalHours, SetTotalHours] = useState(0);
    const firstID = Object.keys(BAU_activity)[0];

    const handleSubmit = (e) => {
        fetch('http://localhost:3000/post_data', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            mode: 'cors',  // Specify the HTTP method
            body: JSON.stringify(BAU_activity) // Collect form data
        })
        console.log(BAU_activity);
    }

    function TimeSheetLoop(setID) {
        const [seed, setSeed] = useState(0);
        var totalMon = 0;
        var totalTue = 0;
        var totalWed = 0;
        var totalThur = 0;
        var totalFri = 0;
        var totalSat = 0;
        var totalSun = 0;

        for (const key in BAU_activity) {
            totalMon += Number(BAU_activity[key]['mon']);
            totalTue += Number(BAU_activity[key]['tue']);
            totalWed += Number(BAU_activity[key]['wed']);
            totalThur += Number(BAU_activity[key]['thur']);
            totalFri += Number(BAU_activity[key]['fri']);
            totalSat += Number(BAU_activity[key]['sat']);
            totalSun += Number(BAU_activity[key]['sun']);
        };
        let GrandTotal = totalMon + totalTue + totalWed + totalThur + totalFri + totalSat + totalSun;
        SetTotalHours(GrandTotal);
        return (
            <>
                {Object.entries(BAU_activity).map((t, k) => <Showtimesheet id={t[0]} data={t} seedSetter={setSeed}></Showtimesheet>)}
                <tr>
                    <td>Total Hours</td>
                    <td></td>
                    <td></td>
                    {(() => {
                        if (totalMon > 8) {
                            return (
                                <td><p style={{color:'red'}}>{totalMon}</p></td>
                            )
                        }
                        return <td><p>{totalMon}</p></td>
                    })()}
                    {(() => {
                        if (totalTue > 8) {
                            return (
                                <td><p style={{color:'red'}}>{totalTue}</p></td>
                            )
                        }
                        return <td><p>{totalTue}</p></td>
                    })()}
                    {(() => {
                        if (totalWed > 8) {
                            return (
                                <td><p style={{color:'red'}}>{totalWed}</p></td>
                            )
                        }
                        return <td><p>{totalWed}</p></td>
                    })()}
                    {(() => {
                        if (totalThur > 8) {
                            return (
                                <td><p style={{color:'red'}}>{totalThur}</p></td>
                            )
                        }
                        return <td><p>{totalThur}</p></td>
                    })()}
                    {(() => {
                        if (totalFri > 8) {
                            return (
                                <td><p style={{color:'red'}}>{totalFri}</p></td>
                            )
                        }
                        return <td><p>{totalFri}</p></td>
                    })()}
                    {(() => {
                        if (totalSat > 8) {
                            return (
                                <td><p style={{color:'red'}}>{totalSat}</p></td>
                            )
                        }
                        return <td><p>{totalSat}</p></td>
                    })()}
                    {(() => {
                        if (totalSun > 8) {
                            return (
                                <td><p style={{color:'red'}}>{totalSun}</p></td>
                            )
                        }
                        return <td><p>{totalSun}</p></td>
                    })()}
                    <td>{GrandTotal}</td>
                </tr>
            </>
        )
    };

    function Showtimesheet({ id, data, seedSetter }) {


        const ChangeMon = (e) => {
            e.preventDefault()
            var currId = e.target.id

            var currVal = e.target.value

            BAU_activity[currId]['mon'] = currVal;
            seedSetter(Math.random())
        };

        const ChangeTue = (e) => {
            e.preventDefault()
            var currId = e.target.id
            var currVal = e.target.value
            BAU_activity[currId]['tue'] = currVal;
            seedSetter(Math.random())
        };

        const ChangeWed = (e) => {
            e.preventDefault()
            var currId = e.target.id
            var currVal = e.target.value
            BAU_activity[currId]['wed'] = currVal;
            seedSetter(Math.random())
        };

        const ChangeThur = (e) => {
            e.preventDefault()
            var currId = e.target.id
            var currVal = e.target.value
            BAU_activity[currId]['thur'] = currVal;
            seedSetter(Math.random())
        };

        const ChangeFri = (e) => {
            e.preventDefault()
            var currId = e.target.id
            var currVal = e.target.value
            BAU_activity[currId]['fri'] = currVal;
            seedSetter(Math.random())
        };

        const ChangeSat = (e) => {
            e.preventDefault()
            var currId = e.target.id
            var currVal = e.target.value
            BAU_activity[currId]['sat'] = currVal;
            seedSetter(Math.random())
        };

        const ChangeSun = (e) => {
            e.preventDefault()
            var currId = e.target.id
            var currVal = e.target.value
            BAU_activity[currId]['sun'] = currVal;
            seedSetter(Math.random())
        };

        const ChangeName = (e) => {
            e.preventDefault()
            var currId = e.target.id
            var currVal = e.target.value
            BAU_activity[currId]['project_name'] = currVal;
            seedSetter(Math.random())
        };

        const ChangeTask = (e) => {
            e.preventDefault()
            var currId = e.target.id
            var currVal = e.target.value
            BAU_activity[currId]['task'] = currVal;
            seedSetter(Math.random())
        };

        const CreateNewEntry = (e) => {
            setID(ID + 1);
            BAU_activity[ID] = {
                project_name: "",
                task: "",
                mon: 0,
                tue: 0,
                wed: 0,
                thur: 0,
                fri: 0,
                sat: 0,
                sun: 0
            };
            seedSetter(Math.random())
        }

        const DeleteEntry = (e) => {
            e.preventDefault()
            var currId = e.target.id
            delete BAU_activity[currId];
            seedSetter(Math.random());
        }

        var total = Number(data[1].mon) + Number(data[1].tue) + Number(data[1].wed) + Number(data[1].thur) + Number(data[1].fri) + Number(data[1].sat) + Number(data[1].sun);
        return (
            <>
                <tr>
                    <td>BAU Activity</td>
                    <td>
                        <select value={data[1].project_name} id={id} onChange={ChangeName}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </td>
                    <td>
                        <select value={data[1].task} id={id} onChange={ChangeTask}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </td>
                    <td><input type="text" value={data[1].mon} id={id} onChange={ChangeMon} /></td>
                    <td><input type="text" value={data[1].tue} id={id} onChange={ChangeTue} /></td>
                    <td><input type="text" value={data[1].wed} id={id} onChange={ChangeWed} /></td>
                    <td><input type="text" value={data[1].thur} id={id} onChange={ChangeThur} /></td>
                    <td><input type="text" value={data[1].fri} id={id} onChange={ChangeFri} /></td>
                    <td><input type="text" value={data[1].sat} id={id} onChange={ChangeSat} /></td>
                    <td><input type="text" value={data[1].sun} id={id} onChange={ChangeSun} /></td>
                    <td><p>{total}</p></td>
                    <td><button onClick={CreateNewEntry}>+</button></td>
                    {(() => {
                        if (id !== firstID) {
                            return (
                                <td><button id={id} onClick={DeleteEntry}>-</button></td>
                            )
                        }
                        return null;
                    })()}
                </tr>

            </>
        )
    }

    return (

        <div className='main'>
            <h1>TimeSheet</h1>
            <h3>Total Time: {TotalHours}</h3>
            <p className='subHeading'>Allocation Extension</p>
            <p className='subHeading2'>TimeSheet</p>
            <table>
                <tr>
                    <th>Project Type</th>
                    <th>Project Name</th>
                    <th>Task Name</th>
                    <th>Mon 29</th>
                    <th>Tue 30</th>
                    <th>Wed 31</th>
                    <th>Thu 1</th>
                    <th>Fri 2</th>
                    <th>Sat 3</th>
                    <th>Sun 4</th>
                    <th>Total</th>
                    <th>   </th>
                    <th>   </th>
                </tr>
                <TimeSheetLoop setID={setID} />
            </table>
            <div >
                <Button onClick={handleSubmit} label="Submit" />
            </div>
        </div>
    )
};

export default TimeSheet;