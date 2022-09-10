const advice = document.querySelector('.advice');

const reason = document.getElementById('reason');

const date = document.getElementById('date');

const form = document.querySelector('.booking-form');

const pid = document.getElementById('pid');

const check = document.querySelector('.pid-check');

const timeText = document.querySelector('.time-text');

const pillGroup = document.querySelector('.pill-group');

const pidPattern = /^[A-Z]{2}[0-9]{1,}[A-Z]{1}$/;

pid.addEventListener('input', () => {
  pid.value = pid.value.toUpperCase();
  const pidValue = pid.value;
  const pidNumbers = pid.value.slice(2, pid.value.length - 1).split('');
  const pidLast = pid.value.slice(pid.value.length - 1, pid.value.length);
  if (pidPattern.test(pidValue)) {
    let pidSum = 0;
    pidNumbers.forEach((number) => {
      pidSum += Number(number);
    });

    if (
      pidLast.charCodeAt() - 64 == pidSum % 26 ||
      pidLast.charCodeAt() - 64 == pidSum
    ) {
      check.innerText = 'Valid Patient ID';
      check.style.color = 'green';
      pid.classList.remove('invalid');
    } else {
      check.innerText = 'Invalid Patient ID';
      check.style.color = 'red';
    }
  } else {
    check.innerText = 'Invalid Patient ID';
    check.style.color = 'red';
  }
});

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}

today = `${yyyy}-${mm}-${dd}`;

date.min = today;

reason.addEventListener('change', () => {
  switch (reason.value) {
    case 'childhood':
      advice.innerHTML =
        '<p>Childhood vaccines: Here is a disclaimer that multiple vaccines are normally administered in combination and may cause the child to be sluggish or feverous for 24 - 48 hours afterwards.</p>';
      break;
    case 'influenza':
      advice.innerHTML =
        '<p>Influenza: The best time to get vaccinated is in April and May each year for optimal protection over the winter months.</p>';
      break;
    case 'covid':
      advice.innerHTML =
        '<p>Covid Booster Shot: We advice that everyone should arrange to have their third shot as soon as possible and adults over the age of 30 should have their fourth shot to protect against new variant strains.</p>';
      break;
    case 'blood':
      advice.innerHTML =
        '<p>Blood test: Some tests require some fasting ahead of time and a staff member will advise you on this prior to the appointment.</p>';
      break;
    default:
      advice.innerHTML = '';
  }
});

console.log(form);

form.addEventListener('submit', (e) => {
  const pidValue = pid.value;
  const pidNumbers = pid.value.slice(2, pid.value.length - 1).split('');
  const pidLast = pid.value.slice(pid.value.length - 1, pid.value.length);
  const timeOptions = document.querySelectorAll(
    ".pill-group input[type='checkbox']:checked"
  );

  if (timeOptions.length === 0) {
    e.preventDefault();
    timeText.classList.remove('hidden');
  }

  if (!pidPattern.test(pidValue)) {
    e.preventDefault();
    pid.classList.add('invalid');
  } else {
    let pidSum = 0;
    pidNumbers.forEach((number) => {
      pidSum += Number(number);
    });

    if (
      !(pidLast.charCodeAt() - 64 == pidSum % 26) &&
      !(pidLast.charCodeAt() - 64 == pidSum)
    ) {
      e.preventDefault();
      pid.classList.add('invalid');
    }
  }
});

pillGroup.addEventListener('click', () => {
  const timeOptions = document.querySelectorAll(
    ".pill-group input[type='checkbox']:checked"
  );

  if (timeOptions.length > 0) {
    timeText.classList.add('hidden');
  }
});
