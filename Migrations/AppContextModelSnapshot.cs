﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using ReceptionOfPatients;

#nullable disable

namespace ReceptionOfPatients.Migrations
{
    [DbContext(typeof(AppContext))]
    partial class AppContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DoctorService", b =>
                {
                    b.Property<int>("DoctorId")
                        .HasColumnType("integer");

                    b.Property<int>("ServicesId")
                        .HasColumnType("integer");

                    b.HasKey("DoctorId", "ServicesId");

                    b.HasIndex("ServicesId");

                    b.ToTable("DoctorService");
                });

            modelBuilder.Entity("ReceptionOfPatients.Doctor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("FatherName")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OfficeNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Specialization")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("StartWorkDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Doctors");
                });

            modelBuilder.Entity("ReceptionOfPatients.Patient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("FatherName")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("ReceptionOfPatients.Reception", b =>
                {
                    b.Property<int>("DoctorId")
                        .HasColumnType("integer");

                    b.Property<int>("PatientId")
                        .HasColumnType("integer");

                    b.Property<int>("Id")
                        .HasPrecision(1, 1)
                        .HasColumnType("integer");

                    b.Property<DateTime>("ReceptionDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("ReceptionResultId")
                        .HasColumnType("integer");

                    b.HasKey("DoctorId", "PatientId");

                    b.HasIndex("PatientId");

                    b.HasIndex("ReceptionResultId")
                        .IsUnique();

                    b.ToTable("Receptions", (string)null);
                });

            modelBuilder.Entity("ReceptionOfPatients.ReceptionResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Decsription")
                        .HasColumnType("text");

                    b.Property<string>("Diagnosis")
                        .HasColumnType("text");

                    b.Property<string>("DoctorInfo")
                        .HasColumnType("text");

                    b.Property<string>("Medicines")
                        .HasColumnType("text");

                    b.Property<string>("PatientInfo")
                        .HasColumnType("text");

                    b.Property<int?>("ReceptionId")
                        .HasColumnType("integer");

                    b.Property<string>("Recomendation")
                        .HasColumnType("text");

                    b.Property<string>("UsesServices")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ReceptionResults");
                });

            modelBuilder.Entity("ReceptionOfPatients.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.Property<string>("ServiceName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("DoctorService", b =>
                {
                    b.HasOne("ReceptionOfPatients.Doctor", null)
                        .WithMany()
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ReceptionOfPatients.Service", null)
                        .WithMany()
                        .HasForeignKey("ServicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ReceptionOfPatients.Reception", b =>
                {
                    b.HasOne("ReceptionOfPatients.Doctor", "Doctor")
                        .WithMany("Receptions")
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ReceptionOfPatients.Patient", "Patient")
                        .WithMany("Receptions")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ReceptionOfPatients.ReceptionResult", "ReceptionResult")
                        .WithOne("Reception")
                        .HasForeignKey("ReceptionOfPatients.Reception", "ReceptionResultId");

                    b.Navigation("Doctor");

                    b.Navigation("Patient");

                    b.Navigation("ReceptionResult");
                });

            modelBuilder.Entity("ReceptionOfPatients.Doctor", b =>
                {
                    b.Navigation("Receptions");
                });

            modelBuilder.Entity("ReceptionOfPatients.Patient", b =>
                {
                    b.Navigation("Receptions");
                });

            modelBuilder.Entity("ReceptionOfPatients.ReceptionResult", b =>
                {
                    b.Navigation("Reception");
                });
#pragma warning restore 612, 618
        }
    }
}
