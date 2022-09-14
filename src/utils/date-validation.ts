export const validateDate = (date: string) => {
        const dateList = date.split('/');
        date = dateList[2]+'-'+dateList[1]+'-'+dateList[0]
        const pickedDate = new Date(Date.parse(date));
        const todaysDate = new Date();
        todaysDate.setHours(0, 0, 0, 0);
        
        return pickedDate < todaysDate;
}