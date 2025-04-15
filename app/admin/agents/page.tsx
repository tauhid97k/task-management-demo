"use client";

import { useEffect, useState } from "react";

import {
  generateAgents,
  generateAgentPerformanceData,
  departmentDistribution,
  weeklyTaskCompletion,
  getAllClients,
} from "@/lib/data-utils";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCards } from "@/components/dashboard/stat-cards";
import { ChartSection } from "@/components/dashboard/chart-section";
import { AgentCard } from "@/components/dashboard/agent-card";
import { AgentDetailsModal } from "@/components/dashboard/agent-details-modal";
import { ClientDetailsModal } from "@/components/dashboard/client-details-modal";

// Initialize agents
const agents = generateAgents();

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [reassignedTasks, setReassignedTasks] = useState({});
  const [agentPerformanceData, setAgentPerformanceData] = useState(
    generateAgentPerformanceData(agents)
  );

  // Filter agents based on search term and status filter
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || agent.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Count clients by status
  const allClients = getAllClients(agents);
  const clientCounts = {
    pending: allClients.filter((client) => client.status === "pending").length,
    inProgress: allClients.filter((client) => client.status === "in-progress")
      .length,
    completed: allClients.filter((client) => client.status === "completed")
      .length,
  };

  // Handle task reassignment
  const handleReassignTask = (taskId, targetAgentId) => {
    const targetAgent = agents.find((a) => a.id === targetAgentId);

    if (targetAgent) {
      setReassignedTasks({
        ...reassignedTasks,
        [taskId]: {
          agentId: targetAgentId,
          agentName: targetAgent.name,
          timestamp: new Date().toISOString(),
        },
      });
    }
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
  };

  const handleViewAgentDetails = (agent) => {
    setSelectedAgent(agent);
    setIsAgentModalOpen(true);
  };

  // Update agent performance data when reassignments change
  useEffect(() => {
    setAgentPerformanceData(generateAgentPerformanceData(agents));
  }, [reassignedTasks]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col">
        <DashboardHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <StatCards agents={agents} clientCounts={clientCounts} />

          <ChartSection
            agentPerformanceData={agentPerformanceData}
            departmentDistribution={departmentDistribution}
            weeklyTaskCompletion={weeklyTaskCompletion}
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onViewDetails={handleViewAgentDetails}
              />
            ))}
          </div>

          {/* Agent Details Modal */}
          <AgentDetailsModal
            isOpen={isAgentModalOpen}
            onOpenChange={setIsAgentModalOpen}
            selectedAgent={selectedAgent}
            agents={agents}
            reassignedTasks={reassignedTasks}
            handleReassignTask={handleReassignTask}
          />

          {/* Client Details Modal */}
          <ClientDetailsModal
            isOpen={isDetailsModalOpen}
            onOpenChange={setIsDetailsModalOpen}
            selectedClient={selectedClient}
          />
        </main>
      </div>
    </div>
  );
}
