document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message!');
    // Here you could add code to send the form data to the server
    this.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("appointmentModal");
    const openBtn = document.getElementById("openBooking");
    const closeBtn = document.querySelector(".close-btn");
    const bookingForm = document.getElementById("bookingForm");
    const dateInput = document.getElementById("appt-date");

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Open Modal
    openBtn.onclick = () => modal.style.display = "block";

    // Close Modal
    closeBtn.onclick = () => modal.style.display = "none";

    // Close if clicking outside the box
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    }

    // Handle Form Submission
    bookingForm.onsubmit = (e) => {
        e.preventDefault();

        const timeVal = document.getElementById("appt-time").value;
        const dateVal = dateInput.value;
        const hour = parseInt(timeVal.split(':')[0]);

        // 1. Check if closed (Before 9 AM or After 5 PM)
        if (hour < 9 || hour >= 17) {
            alert("Sorry, we are closed during this time. Please select a time between 9:00 AM and 5:00 PM.");
            return;
        }

        // 2. Check if Weekend (0 = Sunday, 6 = Saturday)
        const day = new Date(dateVal).getUTCDay();
        if (day === 0 || day === 6) {
            alert("Sorry, we are closed on weekends. Please pick a weekday!");
            return;
        }

        // Success Path
        alert(`Success! Appointment requested for ${dateVal} at ${timeVal}.`);
        bookingForm.reset();
        modal.style.display = "none";
    };
});
