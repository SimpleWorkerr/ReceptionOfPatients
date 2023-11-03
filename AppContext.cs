using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Diagnostics.Metrics;
using System;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ReceptionOfPatients
{
    public class AppContext:DbContext
    {
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Reception> Receptions { get; set; }
        public DbSet<ReceptionResult> ReceptionResults { get; set; }
        public AppContext()
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"Host=localhost;Port=5432;Database=PatientReceptions;Username=postgres;Password=123");
            //optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Trusted_connection=True;Database=ReceptionClient");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doctor>()
            .HasMany(d => d.Patients)
            .WithMany(d => d.Doctors)
            .UsingEntity<Reception>(
            j => j
            .HasOne(pt => pt.Patient)
                        .WithMany(t => t.Receptions)
                        .HasForeignKey(pt => pt.PatientId),
                    j => j
                        .HasOne(pt => pt.Doctor)
                        .WithMany(t => t.Receptions)
                        .HasForeignKey(pt => pt.DoctorId),
                    j =>
                    {
                        j.HasKey(t => new { t.DoctorId, t.PatientId });
                        j.ToTable("Receptions");
                    });
            
        }
    }
}
