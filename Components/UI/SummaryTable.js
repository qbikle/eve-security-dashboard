export default function SummaryTable({ data }) {
  return (
    <div className="flex">
      <table className="bg-gray-900 w-full text-white">
        <thead>
          <tr>
            <th className="py-2 text-left">Date</th>
            <th className="py-2 text-left">Time</th>
            <th className="py-2 text-left">Event</th>
            <th className="py-2 text-left">Source IP</th>
            <th className="py-2 text-left">Category</th>
            <th className="py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t border-gray-700">
              <td className="py-2">{item.date}</td>
              <td className="py-2">{item.time}</td>
              <td className="py-2">{item.event_type}</td>
              <td className="py-2">{item.src_ip}</td>
              <td className="py-2">{item.alert_category}</td>
              <td className="py-2">{item.alert_action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
