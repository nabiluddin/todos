-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)
--
-- Data for Name: task_status; Type: TABLE DATA; Schema: todos; Owner: postgres
--

COPY todos.task_status (id, status) FROM stdin;
a3c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b    Todo
a4c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b    In Progress
a5c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b    Done
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: todos; Owner: postgres
--

COPY todos."user" (id, username, email, password_hash, created_at, modified_at) FROM stdin;
b3c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b    johndoe johndoe@example.com     hashed_password 2025-01-10 07:07:23.206746      \N
aec68f92-8842-4949-9153-511037357a89    First user.demo email@email.com $2b$10$y3PbczEY0ezYXj/GHBuwGOQ9rQC7Sr41fj1lxYzCyelm5kzXGBMfm    2025-01-10 13:12:52.913 2025-01-10 13:12:52.913
c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Nabil Uddin     abc@abc.com     $2b$10$KLh1wihp.nDwE2RDBgeSY.EIFkBVORnGul8uvBOHf0BNC6zze1biS    2025-01-12 20:12:58.88  2025-01-17 07:26:29.779
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: todos; Owner: postgres
--

COPY todos.task (id, created_by, title, description, completed, due_date, created_at, modified_at, status_id) FROM stdin;
31dd1f6c-e9e0-4e22-89cb-a9219a4d64b9    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Implement Auth System   Develop authentication and authorization for the app    f       2025-01-25      2025-01-08 12:30:15.678 2025-01-13 21:02:06.166   a3c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
36167bcb-121f-4e79-b42d-0accb80b4993    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Server Maintenance      Perform routine maintenance on the production server    f       2025-01-22      2025-01-07 08:45:34.789 2025-01-13 21:02:06.166   a4c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
4efc4673-b558-41c5-a288-27db9783da4c    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Team Meeting    Schedule and host a team meeting to discuss progress    t       2025-01-15      2025-01-05 13:22:08.123 2025-01-13 21:02:06.166   a5c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
6983fbeb-18f7-4579-915f-b3b3ac137b8b    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Code Review     Review code submitted by team members   f       2025-01-18      2025-01-06 08:50:40.567 2025-01-13 21:02:06.166 a3c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
556c1855-45fe-415a-ae5a-915a1c334b53    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Deploy Staging Environment      Deploy the application to the staging environment for testing   f       2025-01-28      2025-01-07 09:15:23.567   2025-01-13 21:02:06.166 a4c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
fa279443-785f-44e8-9574-bc842a0f828b    aec68f92-8842-4949-9153-511037357a89    Update Documentation    Ensure all project documentation is current     f       2025-01-14      2025-01-16 21:12:59.462 2025-01-16 21:12:59.462   a3c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
d6d97ce7-fe4b-4241-8b24-2e27690029e6    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Bug Fix: Login Issue    Resolve the issue causing login errors for certain users        t       2025-01-12      2025-01-05 15:30:12.456   2025-01-13 21:02:06.166 a5c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
e53e1a0b-5141-4afb-a166-790590453ae5    aec68f92-8842-4949-9153-511037357a89    Create Marketing Plan   Develop a plan for the upcoming product launch marketing        f       2025-01-18      2025-01-16 21:07:53.572   2025-01-16 21:13:29.33  a4c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
c958583d-d245-46ba-bf85-f9608236a104    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Database Backup Perform a full backup of the PostgreSQL database.       f       2025-01-20      2025-01-07 17:45:23.789 2025-01-16 09:21:51.19    a6c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
207d1a80-a2ed-4b59-84d3-ae494bc70b61    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Write Documentation     Write comprehensive documentation for the project       f       2025-02-05      2025-01-09 09:15:12.456 2025-01-16 10:25:39.23    a4c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
53f10a75-f51e-472c-9eb1-4cb23c866edd    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Update Documentation    Update Documentation    f       2025-01-21      2025-01-16 17:58:11.423 2025-01-16 17:59:05.85  a6c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
b83c04ee-adfc-4763-a449-c5b116fa90d2    aec68f92-8842-4949-9153-511037357a89    Design API Endpoints    Create API designs for the new feature module   f       2025-01-23      2025-01-16 21:28:31.124 2025-01-16 21:28:31.124   a4c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
89a01887-508e-4a08-9005-744391979cb8    aec68f92-8842-4949-9153-511037357a89    Research New Tools      Investigate new development tools for improving workflow        f       2025-01-15      2025-01-16 21:29:57.458   2025-01-16 21:29:57.458 a3c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
8b697735-4dde-4775-be77-3d77add7a039    aec68f92-8842-4949-9153-511037357a89    Write Test Cases        Develop unit tests for critical functions       t       2025-01-16      2025-01-16 21:31:36.476 2025-01-16 21:31:48.29    a5c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
ef372e46-0f8b-4366-b765-577e8f663622    aec68f92-8842-4949-9153-511037357a89    Optimize Database Queries       Analyze and optimize slow database queries      t       2025-01-04      2025-01-16 21:32:29.308 2025-01-16 21:32:29.308   a5c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
e58671a8-da62-41fd-a7f6-98e46acc0ee2    aec68f92-8842-4949-9153-511037357a89    Deploy Staging Environment      Deploy the application to the staging environment for testing   t       2025-01-19      2025-01-16 21:57:38.795   2025-01-16 21:57:38.795 a5c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
95078fff-862a-4253-878e-fdb10a3da4c0    aec68f92-8842-4949-9153-511037357a89    Onboard New Developer   Help the new team member set up their environment       f       2025-01-20      2025-01-16 21:08:35.506 2025-01-16 21:08:35.506   a6c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
c5f093ff-e5a4-4e4e-ad57-123a92d7f5e2    aec68f92-8842-4949-9153-511037357a89    Conduct Security Audit  Review application for security vulnerabilities f       2025-01-21      2025-01-16 21:09:19.739 2025-01-16 21:09:19.739   a3c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
5977c835-c688-490b-885e-19b124e978e0    aec68f92-8842-4949-9153-511037357a89    Configure CI/CD Pipeline        Set up continuous integration and deployment pipeline   f       2025-01-22      2025-01-16 21:09:47.803   2025-01-16 21:09:47.803 a6c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
fbb37597-f437-4153-91ef-2d0b1d13e931    aec68f92-8842-4949-9153-511037357a89    Content Writing Prepare content for the website launch  f       2025-01-18      2025-01-16 22:50:33.274 2025-01-16 22:51:19.626 a6c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
1df4c279-9828-4cec-8e76-4256269748ad    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    UI Design Updates       Update the UI design to match the latest wireframe      f       2025-01-22      2025-01-10 14:20:11.345 2025-01-17 18:03:45.735   a3c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
ee824fef-e2ac-4764-b5f6-2b65c041910f    c22b0ca5-61e6-4d9a-8f42-2d82ce37728b    Conduct Security Audit  Review application for security vulnerabilities f       2025-01-31      2025-01-16 14:37:16.209 2025-01-17 18:04:49.758   a6c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b
\.


--
-- PostgreSQL database dump complete
--