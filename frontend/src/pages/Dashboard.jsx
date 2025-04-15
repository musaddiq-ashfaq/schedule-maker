import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", start: "" });

  // Fetch schedules
  useEffect(() => {
    // axiosClient.get("/schedules").then(({ data }) => setEvents(data));
    try {
      const token = localStorage.getItem("token");  // Retrieve token
      const res =  axiosClient.get("http://localhost:5000/api/schedules", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Schedules:", res.data);
    } catch (error) {
      console.error("Error fetching schedules:", error.response?.data?.message || error.message);
    }
  }, []);

  // Handle event drop (drag & drop update)
  const handleEventDrop = async (eventDropInfo) => {
    const updatedEvent = {
      id: eventDropInfo.event.id,
      start: eventDropInfo.event.startStr,
      end: eventDropInfo.event.endStr,
    };
    await axiosClient.put(`/schedules/${updatedEvent.id}`, updatedEvent);
  };

  // Handle form submission to create a new schedule
  const handleCreateEvent = async (eventData) => {
    try {
      const token = localStorage.getItem("token");  // Retrieve token
      const res = await axiosClient.post("http://localhost:5000/api/schedules", eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Event created:", res.data);
    } catch (error) {
      console.error("Error creating event:", error.response?.data?.message || error.message);
    }
  };
  

  // Handle event deletion
  const handleEventDelete = async (id) => {
    try {
      await axiosClient.delete(`/schedules/${id}`);
      setEvents(events.filter((event) => event.id !== id)); // Remove from frontend
    } catch (error) {
      console.error(
        "Error deleting event:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Schedule Manager</h2>

      {/* Event Creation Form */}
      <form onSubmit={handleCreateEvent} className="mb-4">
        <input
          type="text"
          placeholder="Event Title"
          className="border p-2 mr-2"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          className="border p-2 mr-2"
          value={newEvent.startTime} // Fix key name
          onChange={(e) =>
            setNewEvent({ ...newEvent, startTime: e.target.value })
          } // Fix key name
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Event
        </button>
      </form>

      {/* FullCalendar for displaying schedules */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable
        eventDrop={handleEventDrop}
        eventClick={(info) => {
          if (window.confirm(`Delete event: "${info.event.title}"?`)) {
            handleEventDelete(info.event.id);
          }
        }}
      />
    </div>
  );
};

export default Dashboard;
