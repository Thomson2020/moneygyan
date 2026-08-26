import ScrollVelocity from "../Components/ScrollVelocity/ScrollVelocity";

export default function ScrollPartners() {
  const fundHouses =
    "Aditya Birla Sun Life • Axis • Bandhan • Baroda BNP Paribas • Bank Of India • Bajaj • Canara Robeco • DSP • Edelweiss • Franklin Templeton • HDFC • HSBC • Helios • ICICI Prudential • Invesco • ITI • JM Financial • Kotak Mahindra • LIC • Mahindra Manulife • Mirae Asset • Motilal Oswal • Nippon India • PGIM • PPFAS • Quant • Quantum • SBI • Sundaram • Samco • Tata • Taurus • The Wealth Company • Union • UTI";

  return (
    <section className="fund-scroll">
      <p className="stat">OUR MUTUAL FUND PARTNERS</p>
      <ScrollVelocity
        texts={[fundHouses]}
        velocity={25}
      />

      <ScrollVelocity
        texts={[fundHouses]}
        velocity={-25}
      />
    </section>
  );
}